import { businessQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { GroupsScreen } from "@/modules/groups/screens/groups.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessId: string;
}

export function GroupsSuspense({ businessId }: Props) {
  const {
    data: business,
    isRefetching,
    refetch,
  } = useSuspenseQuery(businessQueriesOptions.findOne(businessId));

  return (
    <GroupsScreen
      businessId={businessId}
      groups={business.groups}
      isPending={isRefetching}
      refetch={() => refetch()}
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
      <GroupsSuspense businessId={businessId} />
    </Suspense>
  );
}

export default function Groups() {
  const { hasPermission } = usePermissions();

  const userCanReadGroups = hasPermission("groups:read");

  if (!userCanReadGroups)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver grupos"]}
        />
      </View>
    );

  return <Screen />;
}
