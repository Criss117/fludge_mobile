import { useTheme } from "@/integrations/theme";
import { MoonIcon, SunIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Switch } from "./ui/switch";
import { Text } from "./ui/text";

interface Props {
  variant?: "button" | "switch";
}

export function ToggleTheme({ variant = "button" }: Props) {
  const { theme, toggleTheme } = useTheme();

  if (variant === "switch") {
    return (
      <Pressable onPress={toggleTheme}>
        <View className="py-3 px-2 flex-row justify-between">
          <Text variant="large">Modo oscuro</Text>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </View>
      </Pressable>
    );
  }

  if (variant === "button") {
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
}
