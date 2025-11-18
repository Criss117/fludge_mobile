import { employeesQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { EmployeeActions } from "@/modules/employees/components/employee-actions";
import {
  EmployeeScreen,
  EmployeeScreenSkeleton,
} from "@/modules/employees/screens/employee.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessId: string;
  employeeId: string;
}

function EmployeeSuspense({ businessId, employeeId }: Props) {
  const {
    data: employee,
    isRefetching,
    refetch,
  } = useSuspenseQuery(employeesQueriesOptions.findOne(businessId, employeeId));

  return (
    <>
      <Stack.Screen
        options={{
          title: `${employee.user.firstName} ${employee.user.lastName}`,
          headerRight: () => (
            <EmployeeActions businessId={businessId} employee={employee} />
          ),
        }}
      />
      <EmployeeScreen
        businessId={businessId}
        employee={employee}
        isPending={isRefetching}
        refetch={refetch}
      />
    </>
  );
}

function Screen() {
  const { businessId, employeeId } = useGlobalSearchParams<{
    businessId?: string;
    employeeId?: string;
  }>();

  if (!businessId || !employeeId) return null;

  return (
    <Suspense fallback={<EmployeeScreenSkeleton />}>
      <EmployeeSuspense businessId={businessId} employeeId={employeeId} />
    </Suspense>
  );
}

export default function Employee() {
  const { hasPermission } = usePermissions();

  const userCanReadEmployee = hasPermission("employees:read");

  if (!userCanReadEmployee)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver empleados"]}
        />
      </View>
    );

  return <Screen />;
}
