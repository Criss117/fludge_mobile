import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { GroupDetail } from "@/shared/entities/group.entity";
import { View } from "react-native";
import { AssignEmployeesDialog } from "./assign-employees-dialog";
import { EmployeesList } from "./employees-list";

interface Props {
  group: GroupDetail;
}

function EmployeesHeader({ group }: Props) {
  const { selectedEmployeeIds } = EmployeesList.useEmployeesList();
  const totalEmployees = group.employees.length;

  return (
    <View className="flex flex-row justify-between items-center">
      <Text variant="h4">
        Listado de empleados (
        {selectedEmployeeIds.length > 0 && `${selectedEmployeeIds.length}/`}
        {totalEmployees})
      </Text>
      <View className="flex flex-row gap-x-2">
        <AssignEmployeesDialog group={group} />
        <EmployeesList.RemoveEmployeesAlert
          businessId={group.business.id}
          groupId={group.id}
        />
      </View>
    </View>
  );
}

export function EmployeesTab({ group }: Props) {
  return (
    <EmployeesList.Root employees={group.employees}>
      <EmployeesHeader group={group} />
      <Card>
        <CardContent className="gap-6">
          <View className="flex gap-y-2">
            <EmployeesList.List />
          </View>
        </CardContent>
      </Card>
    </EmployeesList.Root>
  );
}
