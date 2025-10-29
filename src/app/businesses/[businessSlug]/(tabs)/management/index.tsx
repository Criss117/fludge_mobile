import { businessQueriesOptions } from "@/integrations/query/query-container";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { ScrollView } from "react-native";

interface Props {
  businessSlug: string;
}

export function EmployeesSuspense({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return (
    <ScrollView>
      <Text>{JSON.stringify(business.employees, null, 2)}</Text>
    </ScrollView>
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
