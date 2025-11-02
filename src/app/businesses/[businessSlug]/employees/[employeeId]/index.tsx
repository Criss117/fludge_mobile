import { employeesQueriesOptions } from "@/integrations/query/query-container";
import { EmployeeScreen } from "@/modules/employees/screens/employee.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

interface Props {
  businessSlug: string;
  employeeId: string;
}

function EmployeeSuspense({ businessSlug, employeeId }: Props) {
  const {
    data: employee,
    isRefetching,
    refetch,
  } = useSuspenseQuery(
    employeesQueriesOptions.findOne(businessSlug, employeeId)
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `${employee.user.firstName} ${employee.user.lastName}`,
        }}
      />
      <EmployeeScreen
        businessSlug={businessSlug}
        employee={employee}
        isPending={isRefetching}
        refetch={refetch}
      />
    </>
  );
}

export default function Employee() {
  const { businessSlug, employeeId } = useGlobalSearchParams<{
    businessSlug: string;
    employeeId: string;
  }>();

  return (
    <Suspense fallback={<Text>Loading employee...</Text>}>
      <EmployeeSuspense businessSlug={businessSlug} employeeId={employeeId} />
    </Suspense>
  );
}
