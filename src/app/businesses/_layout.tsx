import { useAuth } from "@/modules/auth/providers/auth.provider";
import { LoadingScreen } from "@/modules/shared/components/loading-screen";
import { Redirect, Stack } from "expo-router";
import { UserButton } from "../../modules/businesses/components/business-header/user-button";

export default function BusinessesLayout() {
  const { user, isFetchingSession } = useAuth();

  if (isFetchingSession) return <LoadingScreen message="Obteniendo sesión" />;

  if (!user) return <Redirect href="/auth/sign-in" />;

  return (
    <Stack>
      <Stack.Screen
        name="[businessSlug]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Ingresar un nuevo negocio",
          headerRight: () => <UserButton />,
        }}
      />
      <Stack.Screen
        name="select"
        options={{
          title: "Selecciona tu negocio",
          headerRight: () => <UserButton />,
        }}
      />
    </Stack>
  );
}
