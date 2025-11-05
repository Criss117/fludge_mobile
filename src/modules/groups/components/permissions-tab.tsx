import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { ScrollView, View } from "react-native";
import { AddPermissionsDialog } from "./add-permissions-dialog";
import { PermissionsList } from "./permission-list";

interface Props {
  group: GroupDetail;
}

function PermissionsHeader({ group }: Props) {
  const { selectedPermissions } = PermissionsList.usePermissionsList();
  const totalPermissions = group.permissions.length;

  return (
    <View className="flex flex-row justify-between">
      <Text variant="h4">
        Listado de permisos (
        {selectedPermissions.length > 0 && `${selectedPermissions.length}/`}
        {totalPermissions})
      </Text>
      <View className="flex flex-row gap-x-2">
        <AddPermissionsDialog group={group} />
        <PermissionsList.RemovePermissionsAlert
          businessSlug={group.business.slug}
          groupId={group.id}
        />
      </View>
    </View>
  );
}

export function PermissionsTab({ group }: Props) {
  return (
    <PermissionsList.Root permissions={group.permissions}>
      <PermissionsHeader group={group} />
      <Card>
        <CardContent className="gap-6 max-h-96">
          <ScrollView nestedScrollEnabled>
            <View className="flex gap-y-2">
              <PermissionsList.List />
            </View>
          </ScrollView>
        </CardContent>
      </Card>
    </PermissionsList.Root>
  );
}
