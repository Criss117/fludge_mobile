import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { Stack } from "expo-router";
import { ChevronDown, MoreVerticalIcon } from "lucide-react-native";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <View>
            <Icon as={MoreVerticalIcon} size={24} />
          </View>
        ),
        headerTitle: () => (
          <View className="flex flex-row items-center gap-x-2 mx-auto">
            <Text>Ticket 1</Text>
            <Icon as={ChevronDown} size={24} />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
