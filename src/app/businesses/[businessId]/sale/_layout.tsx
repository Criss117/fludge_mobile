import { Icon } from "@/modules/shared/components/ui/icon";
import { TicketsList } from "@/modules/tickets/components/tickets-list";
import { Stack } from "expo-router";
import { MoreVerticalIcon } from "lucide-react-native";
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
            <TicketsList />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
