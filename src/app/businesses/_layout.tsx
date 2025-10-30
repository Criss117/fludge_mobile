import { useAuth } from "@/modules/auth/providers/auth.provider";
import { LoadingScreen } from "@/modules/shared/components/loading-screen";
import { Redirect, Stack } from "expo-router";

export default function BusinessesLayout() {
  const { user, isFetchingSession } = useAuth();

  if (isFetchingSession) return <LoadingScreen message="Obteniendo sesión" />;

  if (!user) return <Redirect href="/auth/sign-in" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="[businessSlug]" />
      <Stack.Screen name="register" />
      <Stack.Screen name="select" />
    </Stack>
  );
}
