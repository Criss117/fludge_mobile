import { AuthProvider } from "@/modules/auth/providers/auth.provider";
import { TanstackQueryProvider } from "./query";
import { ThemeProvider } from "./theme";

export function Integrations({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
