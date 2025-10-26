import { ThemeProvider } from "./theme";

export function Integrations({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
