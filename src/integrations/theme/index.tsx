import { NAV_THEME } from "@/modules/shared/lib/theme";
import { ThemeProvider as TProvider } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <TProvider value={NAV_THEME[colorScheme ?? "dark"]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {children}
    </TProvider>
  );
}
