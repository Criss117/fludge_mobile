import { MoonIcon, SunIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button onPress={toggleColorScheme} variant="ghost" size="icon">
      <Icon as={colorScheme === "dark" ? MoonIcon : SunIcon} size={24} />
    </Button>
  );
}
