import { businessQueriesOptions } from "@/integrations/query/query-container";
import { GroupsScreen } from "@/modules/groups/screens/groups.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

interface Props {
  businessSlug: string;
}

export function GroupsSuspense({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return <GroupsScreen businessSlug={businessSlug} groups={business.groups} />;
}

export default function Groups() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <GroupsSuspense businessSlug={businessSlug} />
    </Suspense>
  );
}
