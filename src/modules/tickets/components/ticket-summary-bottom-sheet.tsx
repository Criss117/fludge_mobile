import { useTheme } from "@/integrations/theme";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import { formatCurrency, spliText } from "@/modules/shared/lib/utils";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef } from "react";
import { View } from "react-native";
import { type TicketItemStore, useTicketsStore } from "../store/tickets.store";
import { TicketItemCard } from "./ticket-item-card";

interface Props {
  businessId: string;
}

export function TicketSummaryBottomSheet({ businessId }: Props) {
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
              {spliText(currentTicketId)} ({currentTicket.length})
            </Text>
            <Text variant="muted" className="text-muted-foreground">
              Total: <Text>$ {formatCurrency(total)}</Text>
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="mt-5 mb-10">
            <Link
              href={{
                pathname: "/businesses/[businessId]/sale/resume",
                params: {
                  businessId,
                },
              }}
              asChild
              push
            >
              <Button disabled={total === 0} onPress={() => {}}>
                <Text>Continuar</Text>
              </Button>
            </Link>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center">
            <Text>No hay productos para mostrar</Text>
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
