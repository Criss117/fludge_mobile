import { Text } from "@/modules/shared/components/ui/text";
import { FlatList, View } from "react-native";
import { ResumeTicketItemCard } from "../components/resume-item-card";
import { TicketResumeFooter } from "../sections/ticket-resume-footer.section";
import type { TicketItemStore } from "../store/tickets.store";

interface Props {
  businessId: string;
  ticketItems: TicketItemStore[];
}

export function TicketResumeScreen({ businessId, ticketItems }: Props) {
  return (
    <View className="px-2 flex-1 flex relative ">
      <FlatList
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 8 }}
        data={ticketItems}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ResumeTicketItemCard item={item} />}
        ListEmptyComponent={
          <View className="flex items-center justify-center">
            <Text>No hay productos para mostrar</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <TicketResumeFooter ticketItems={ticketItems} />
      </View>
    </View>
  );
}
