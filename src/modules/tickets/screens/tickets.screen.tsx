import { SearchInput } from "@/modules/shared/components/search-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { TicketSummary } from "@/shared/entities/tickets.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketCard } from "../components/ticket-card";

interface Props {
  businessId: string;
  tickets: TicketSummary[];
}

export function TicketsScreen({ businessId, tickets }: Props) {
  return (
    <SafeAreaView className="flex-1 relative px-2 flex gap-y-5">
      <View>
        <SearchInput
          placeholder="Buscar Ticket"
          onChangeText={() => {}}
          value=""
        />
      </View>
      <FlatList
        data={tickets}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => <TicketCard ticket={item} />}
      />
      <View className="absolute bottom-4 right-4">
        <Link
          href={{
            pathname: "/businesses/[businessId]/sale",
            params: {
              businessId,
            },
          }}
          asChild
          push
        >
          <Button size="icon" className="rounded-full">
            <Icon as={PlusIcon} size={24} />
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
