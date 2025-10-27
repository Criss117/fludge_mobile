import { NAV_THEME } from "@/modules/shared/lib/theme";
import { ThemeProvider as TProvider } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { createContext, use, useCallback, useLayoutEffect } from "react";

interface Context {
  theme: "light" | "dark";
  toggleTheme: () => Promise<void>;
  setTheme: (theme: "light" | "dark") => Promise<void>;
}

const themeKey = Symbol("theme");

const ThemeContext = createContext<Context | null>(null);

export function useTheme() {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  const setTheme = useCallback(
    async (theme: "light" | "dark") => {
      await AsyncStorage.setItem(themeKey.toString(), theme);
      setColorScheme(theme);
    },
    [setColorScheme]
  );

  const toggleTheme = async () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    await AsyncStorage.setItem(themeKey.toString(), newTheme);
    toggleColorScheme();
  };

  useLayoutEffect(() => {
    AsyncStorage.getItem(themeKey.toString(), (error, value) => {
      setTheme((value as "light" | "dark" | undefined) ?? "light");
    });
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme ?? "dark",
        setTheme,
        toggleTheme,
      }}
    >
      <TProvider value={NAV_THEME[colorScheme ?? "dark"]}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        {children}
      </TProvider>
    </ThemeContext.Provider>
  );
}
