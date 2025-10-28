import { Integrations } from "@/integrations";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "./global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <Integrations>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="businesses" />
      </Stack>
      <PortalHost />
    </Integrations>
  );
}
