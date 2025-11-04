import { useAuth } from "@/modules/auth/providers/auth.provider";
import { PermissionsProvider } from "@/modules/auth/providers/permissions.provider";
import { Stack } from "expo-router";

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
          }}
        />
        <Stack.Screen
          name="employees/create"
          options={{
            title: "Nuevo empleado",
          }}
        />
      </Stack>
    </PermissionsProvider>
  );
}
