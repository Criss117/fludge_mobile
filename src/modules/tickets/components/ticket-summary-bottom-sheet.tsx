import { useTheme } from "@/integrations/theme";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { formatCurrency, spliText } from "@/modules/shared/lib/utils";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { TicketItemStore, useTicketsStore } from "../store/tickets.store";

export function TicketSummaryBottomSheet() {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const tickets = useTicketsStore((state) => state.tickets);
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);
  const removeTicketItem = useTicketsStore((state) => state.removeTicketItem);
  const changeItemQuantity = useTicketsStore(
    (state) => state.changeItemQuantity
  );

  const snapPoints = useMemo(() => ["8%", "50%", "75%"], []);

  const currentTicket = useMemo(
    () => tickets.get(currentTicketId) ?? [],
    [tickets, currentTicketId]
  );

  const increaseItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      changeItemQuantity(currentTicketId, itemId, quantity + 1);
    },
    [currentTicketId, changeItemQuantity]
  );

  const decreaseItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      changeItemQuantity(currentTicketId, itemId, quantity - 1);
    },
    [currentTicketId, changeItemQuantity]
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
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }: { item: TicketItemStore }) => (
          <Card className="py-2 flex flex-row justify-between">
            <CardHeader className="px-2">
              <CardTitle>{spliText(item.name, 20)}</CardTitle>
              <View className="flex flex-row gap-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  disabled={item.quantity <= 1}
                  onPress={() => decreaseItemQuantity(item.id, item.quantity)}
                >
                  <Icon as={MinusIcon} size={18} />
                </Button>
                <View className="flex items-center justify-center p-2">
                  <Text>{item.quantity}</Text>
                </View>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  disabled={item.quantity >= item.stock}
                  onPress={() => increaseItemQuantity(item.id, item.quantity)}
                >
                  <Icon as={PlusIcon} size={18} />
                </Button>
              </View>
            </CardHeader>
            <CardContent className="px-2 flex items-end justify-center">
              <Text variant="muted" className="text-muted-foreground">
                {formatCurrency(item.salePrice)}
              </Text>
              <Text>{formatCurrency(item.salePrice * item.quantity)}</Text>
            </CardContent>
          </Card>
        )}
        className="flex-1 p-2 bg-background h-full"
      />
    </BottomSheet>
  );
}
