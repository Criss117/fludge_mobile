import { businessQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { EmployeesScreen } from "@/modules/employees/screens/employees.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessId: string;
}

export function EmployeesSuspense({ businessId }: Props) {
  const {
    data: business,
    refetch,
    isRefetching,
  } = useSuspenseQuery(businessQueriesOptions.findOne(businessId));

  return (
    <EmployeesScreen
      businessId={businessId}
      employees={business.employees}
      refetch={() => refetch()}
      isPending={isRefetching}
      key={isRefetching ? "pending" : "ready"}
    />
  );
}

function Screen() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <EmployeesSuspense businessId={businessId} />
    </Suspense>
  );
}
export default function Employees() {
  const { hasPermission } = usePermissions();

  const userCanReadEmployees = hasPermission("employees:read");

  if (!userCanReadEmployees)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver grupos"]}
        />
      </View>
    );
  return <Screen />;
}
