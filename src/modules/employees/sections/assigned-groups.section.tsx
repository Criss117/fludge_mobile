import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { GroupCardWithCheckSkeleton } from "@/modules/groups/components/group-card-whit-check";
import { Button } from "@/modules/shared/components/ui/button";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { PlusIcon, Trash2Icon } from "lucide-react-native";
import { View } from "react-native";
import { AssignGroupsDialog } from "../components/assign-groups-dialog";
import { GroupsList } from "../components/groups-list";

interface Props {
  employee: EmployeeDetail;
  businessId: string;
}

function Header({ businessId, employee }: Props) {
  const { selectedGroupsIds } = GroupsList.useGroupsListContext();
  const { hasPermission } = usePermissions();

  const userCanUpdateEmployee = hasPermission("employees:update");

  return (
    <View className="flex flex-row justify-between items-center">
      <Text variant="h4">
        Grupos asignados (
        {selectedGroupsIds.length > 0 && `${selectedGroupsIds.length}/`}
        {employee.groups.length})
      </Text>
      <View className="flex flex-row gap-x-2">
        {userCanUpdateEmployee && (
          <AssignGroupsDialog businessId={businessId} employee={employee} />
        )}
        {userCanUpdateEmployee && (
          <GroupsList.RemoveGroupsAlert
            businessId={businessId}
            employeeId={employee.id}
          />
        )}
      </View>
    </View>
  );
}

export function AssignedGroupsSection({ employee, businessId }: Props) {
  return (
    <View className="flex gap-y-2">
      <GroupsList.Root groups={employee.groups}>
        <Header businessId={businessId} employee={employee} />
        <Card>
          <CardContent className="flex gap-y-2">
            <GroupsList.List />
          </CardContent>
        </Card>
      </GroupsList.Root>
    </View>
  );
}

export function AssignedGroupsSectionSkeleton() {
  return (
    <View className="flex gap-y-2">
      <View className="flex flex-row justify-between items-center">
        <Text variant="h4">Grupos asignados</Text>
        <View className="flex flex-row gap-x-2">
          <Button className="rounded-full" size="icon" disabled>
            <Icon as={PlusIcon} size={24} />
          </Button>
          <Button
            className="rounded-full"
            size="icon"
            variant="outline"
            disabled
          >
            <Icon as={Trash2Icon} />
          </Button>
        </View>
      </View>
      <Card>
        <CardContent className="flex gap-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <GroupCardWithCheckSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
