import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { spliText } from "@/modules/shared/lib/utils";
import { Trash2Icon } from "lucide-react-native";
import { useMemo } from "react";
import { PanResponder, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useTicketActions } from "../hooks/use.ticket-actions";
import { type TicketItemStore } from "../store/tickets.store";
import { QuantityButtons } from "./quantity-buttons";
import { TicketItemPriceDialog } from "./ticket-price-dialog";

interface Props {
  item: TicketItemStore;
}

export function TicketItemCard({ item }: Props) {
  const {
    decreaseItemQuantity,
    increaseItemQuantity,
    setItemQuantity,
    removeItem,
  } = useTicketActions({ itemId: item.id });
  const translateX = useSharedValue(0);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.set(gestureState.dx);
        }
      },
      onPanResponderRelease(e, gestureState) {
        if (gestureState.dx < -50) {
          translateX.set(withSpring(-100));
        } else {
          translateX.set(withSpring(0));
        }
      },
    });
  }, [translateX]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: translateX,
          },
        ],
      }}
      className="flex flex-row relative"
    >
      <Card
        className="py-2 flex flex-row justify-between flex-1"
        {...panResponder.panHandlers}
      >
        <CardHeader className="px-2">
          <CardTitle>{spliText(item.name, 20)}</CardTitle>
          <View className="flex flex-row gap-x-1">
            <QuantityButtons
              decreaseItemQuantity={decreaseItemQuantity}
              increaseItemQuantity={increaseItemQuantity}
              setItemQuantity={setItemQuantity}
              quantity={item.quantity}
              stock={item.stock}
            />
          </View>
        </CardHeader>
        <CardContent className="px-2 flex items-end justify-center">
          <TicketItemPriceDialog item={item} />
        </CardContent>
      </Card>
      <View className="absolute h-full w-20 -right-24 rounded-lg bg-destructive/80 border-destructive border">
        <TouchableOpacity
          className="flex-1 flex items-center justify-center"
          onPress={removeItem}
        >
          <Icon as={Trash2Icon} size={24} className="text-white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
