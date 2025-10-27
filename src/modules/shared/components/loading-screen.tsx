import { useColorScheme } from "nativewind";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NAV_THEME } from "../lib/theme";
import { Text } from "./ui/text";

interface Props {
  message?: string;
}

export function LoadingScreen({ message }: Props) {
  const { colorScheme } = useColorScheme();

  const { colors } = NAV_THEME[colorScheme ?? "light"];

  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <Text className="text-6xl font-bold text-primary h-16">Fludge</Text>
      <ActivityIndicator size={48} color={colors.primary} />
      {message && (
        <Text className="text-sm text-muted-foreground">{message}</Text>
      )}
    </SafeAreaView>
  );
}
