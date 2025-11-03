import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { View } from "react-native";
import { AssignGroupsDialog } from "../components/assign-groups-dialog";
import { GroupsList } from "../components/groups-list";

interface Props {
  employee: EmployeeDetail;
  businessSlug: string;
}

function Header({ businessSlug, employee }: Props) {
  const { selectedGroupsIds } = GroupsList.useGroupsListContext();

  return (
    <View className="flex flex-row justify-between items-center">
      <Text variant="h4">
        Grupos asignados (
        {selectedGroupsIds.length > 0 && `${selectedGroupsIds.length}/`}
        {employee.groups.length})
      </Text>
      <View className="flex flex-row gap-x-2">
        <AssignGroupsDialog businessSlug={businessSlug} employee={employee} />
        <GroupsList.RemoveGroupsAlert
          businessSlug={businessSlug}
          employeeId={employee.id}
        />
      </View>
    </View>
  );
}

export function AssignedGroupsSection({ employee, businessSlug }: Props) {
  return (
    <View className="flex gap-y-2">
      <GroupsList.Root groups={employee.groups}>
        <Header businessSlug={businessSlug} employee={employee} />
        <Card>
          <CardContent className="flex gap-y-2">
            <GroupsList.List />
          </CardContent>
        </Card>
      </GroupsList.Root>
    </View>
  );
}
