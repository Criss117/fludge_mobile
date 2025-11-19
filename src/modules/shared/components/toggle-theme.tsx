import { useTheme } from "@/integrations/theme";
import { MoonIcon, SunIcon } from "lucide-react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onPress={toggleTheme}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <Icon as={theme === "dark" ? SunIcon : MoonIcon} size={20} />
    </Button>
  );
}
