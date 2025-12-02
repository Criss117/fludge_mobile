import { useTheme } from "@/integrations/theme";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import { formatCurrency } from "@/modules/shared/lib/utils";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { View } from "react-native";
import { type TicketItemStore, useTicketsStore } from "../store/tickets.store";
import { TicketItemCard } from "./ticket-item-card";

export function TicketSummaryBottomSheet() {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const tickets = useTicketsStore((state) => state.tickets);
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);

  const snapPoints = useMemo(() => ["8%", "50%", "75%"], []);

  const currentTicket = useMemo(
    () => tickets.get(currentTicketId) ?? [],
    [tickets, currentTicketId]
  );

  const total = useMemo(() => {
    if (!currentTicket) return 0;

    return currentTicket.reduce(
      (acc, item) => acc + item.salePrice * item.quantity,
      0
    );
  }, [currentTicket]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={{
        backgroundColor: colors.primary,
      }}
    >
      <BottomSheetFlatList
        data={currentTicket}
        keyExtractor={(i: TicketItemStore) => i.id}
        ListHeaderComponent={() => (
          <View className="flex flex-row justify-between items-center mb-5">
            <Text variant="h4" className="flex items-center">
              Ticket Actual ({currentTicket.length})
            </Text>
            <Text variant="muted" className="text-muted-foreground">
              Total: <Text>$ {formatCurrency(total)}</Text>
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mt-5 mb-10">
            <Button disabled={total === 0} onPress={() => {}}>
              <Text>Continuar</Text>
            </Button>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }: { item: TicketItemStore }) => (
          <TicketItemCard item={item} />
        )}
        className="flex-1 p-2 bg-background h-full"
      />
    </BottomSheet>
  );
}
