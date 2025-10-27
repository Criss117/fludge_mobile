import { useTheme } from "@/integrations/theme";
import { MoonIcon, SunIcon } from "lucide-react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onPress={toggleTheme} variant="ghost" size="icon">
      <Icon as={theme === "dark" ? MoonIcon : SunIcon} size={24} />
    </Button>
  );
}
