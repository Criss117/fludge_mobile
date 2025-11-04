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
  businessSlug: string;
}

export function EmployeesSuspense({ businessSlug }: Props) {
  const {
    data: business,
    refetch,
    isRefetching,
  } = useSuspenseQuery(businessQueriesOptions.findOne(businessSlug));

  return (
    <EmployeesScreen
      businessSlug={businessSlug}
      employees={business.employees}
      refetch={() => refetch()}
      isPending={isRefetching}
      key={isRefetching ? "pending" : "ready"}
    />
  );
}

function Screen() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <EmployeesSuspense businessSlug={businessSlug} />
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
