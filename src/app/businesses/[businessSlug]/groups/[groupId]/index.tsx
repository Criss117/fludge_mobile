import { groupsQueriesOptions } from "@/integrations/query/query-container";
import { GroupScreen } from "@/modules/groups/screens/group.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessSlug: string;
  groupId: string;
}

function GroupSuspense({ businessSlug, groupId }: Props) {
  const {
    data: group,
    refetch,
    isPending,
  } = useSuspenseQuery(groupsQueriesOptions.findOne(businessSlug, groupId));

  return (
    <>
      <Stack.Screen options={{ title: group.name }} />
      <GroupScreen
        group={group}
        refetch={() => refetch()}
        isPending={isPending}
      />
    </>
  );
}

export default function Group() {
  const { businessSlug, groupId } = useGlobalSearchParams<{
    businessSlug: string;
    groupId: string;
  }>();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <GroupSuspense businessSlug={businessSlug} groupId={groupId} />
    </Suspense>
  );
}
