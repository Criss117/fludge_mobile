import { groupsQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { GroupActions } from "@/modules/groups/components/group-actions";
import { GroupScreen } from "@/modules/groups/screens/group.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessId: string;
  groupId: string;
}

function GroupSuspense({ businessId, groupId }: Props) {
  const {
    data: group,
    refetch,
    isPending,
  } = useSuspenseQuery(groupsQueriesOptions.findOne(businessId, groupId));

  return (
    <>
      <Stack.Screen
        options={{
          title: group.name,
          headerRight: () => (
            <GroupActions group={group} businessId={businessId} />
          ),
        }}
      />
      <GroupScreen
        group={group}
        refetch={() => refetch()}
        isPending={isPending}
      />
    </>
  );
}

function Screen() {
  const { businessId, groupId } = useGlobalSearchParams<{
    businessId?: string;
    groupId?: string;
  }>();

  if (!businessId || !groupId) return null;

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <GroupSuspense businessId={businessId} groupId={groupId} />
    </Suspense>
  );
}

export default function Group() {
  const { hasPermission } = usePermissions();

  const userCanReadGroup = hasPermission("groups:read");

  if (!userCanReadGroup)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver grupos"]}
        />
      </View>
    );

  return <Screen />;
}
