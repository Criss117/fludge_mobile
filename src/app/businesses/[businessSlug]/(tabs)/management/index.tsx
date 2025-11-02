import { businessQueriesOptions } from "@/integrations/query/query-container";
import { EmployeesScreen } from "@/modules/employees/screens/employees.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

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

export default function Employees() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <EmployeesSuspense businessSlug={businessSlug} />
    </Suspense>
  );
}
