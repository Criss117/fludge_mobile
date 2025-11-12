import { useAuth } from "@/modules/auth/providers/auth.provider";
import { PermissionsProvider } from "@/modules/auth/providers/permissions.provider";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Stack } from "expo-router";
import { MoreVerticalIcon } from "lucide-react-native";

export default function BusinessesLayout() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <PermissionsProvider user={user}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="groups/[groupId]/index"
          options={{
            title: "Grupo ...",
            headerRight: () => (
              <Button variant="ghost" size="icon" disabled>
                <Icon as={MoreVerticalIcon} size={24} />
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="groups/create"
          options={{
            title: "Nuevo grupo",
          }}
        />
        <Stack.Screen
          name="employees/[employeeId]/index"
          options={{
            title: "Empleado ...",
            headerRight: () => (
              <Button variant="ghost" size="icon" disabled>
                <Icon as={MoreVerticalIcon} size={24} />
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="employees/create"
          options={{
            title: "Nuevo empleado",
          }}
        />

        <Stack.Screen
          name="categories/create"
          options={{
            title: "Nueva categoría",
          }}
        />

        <Stack.Screen
          name="products/[productId]/index"
          options={{
            title: "Producto ...",
            headerRight: () => (
              <Button variant="ghost" size="icon" disabled>
                <Icon as={MoreVerticalIcon} size={24} />
              </Button>
            ),
          }}
        />
      </Stack>
    </PermissionsProvider>
  );
}
