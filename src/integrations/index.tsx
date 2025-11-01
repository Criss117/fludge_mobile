import { AuthProvider } from "@/modules/auth/providers/auth.provider";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { TanstackQueryProvider } from "./query";
import { ThemeProvider } from "./theme";

export function Integrations({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <KeyboardProvider>
        <TanstackQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanstackQueryProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
}
