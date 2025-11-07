import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { CreateGroupScreen } from "@/modules/groups/screens/create-group.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

function Screen() {
  const { businessSlug } = useLocalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return <CreateGroupScreen businessSlug={businessSlug} />;
}

export default function CreateGroup() {
  const { hasPermission } = usePermissions();

  const userCanCreateGroups = hasPermission("groups:create");

  if (!userCanCreateGroups)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver empleados"]}
        />
      </View>
    );

  return <Screen />;
}
