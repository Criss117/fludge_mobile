import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/ui/dialog";
import { Field, FieldLabel } from "@/modules/shared/components/ui/field";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { Text } from "@/modules/shared/components/ui/text";
import { formatCurrency, spliText } from "@/modules/shared/lib/utils";
import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { PanResponder, Pressable, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { type TicketItemStore, useTicketsStore } from "../store/tickets.store";

interface Props {
  item: TicketItemStore;
}

function PriceDialog({ item }: { item: TicketItemStore }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.salePrice);
  const { width } = useSafeAreaFrame();
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);
  const changeSalePrice = useTicketsStore(
    (state) => state.changeItemsSalePrice
  );

  const onChangeSalePrice = useCallback((salePrice: string) => {
    if (salePrice === "") {
      setValue(0);
      return;
    }

    const salePriceNumber = Number.parseInt(salePrice);
    if (Number.isNaN(salePriceNumber)) return;

    setValue(salePriceNumber);
  }, []);

  const onSaveNewSalePrice = useCallback(() => {
    changeSalePrice(currentTicketId, item.id, value);
    setOpen(false);
  }, [changeSalePrice, currentTicketId, item.id, value]);

  const applyWholeSalePrice = useCallback(() => {
    setValue(item.wholeSalePrice);
  }, [item.wholeSalePrice]);

  const applyOriginalSalePrice = useCallback(() => {
    setValue(item.originalSalePrice);
  }, [item.originalSalePrice]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pressable className="flex justify-center items-end">
          <Text variant="muted" className="text-muted-foreground">
            {formatCurrency(item.salePrice)}
          </Text>
          <View className="flex flex-row gap-x-1 items-center">
            <Text>{formatCurrency(item.salePrice * item.quantity)}</Text>
            <Icon as={PencilIcon} size={12} className="text-muted-foreground" />
          </View>
        </Pressable>
      </DialogTrigger>
      <DialogContent style={{ width: width - 32 }}>
        <DialogHeader>
          <DialogTitle>Precio de venta</DialogTitle>
          <DialogDescription>
            Precio de venta original: {formatCurrency(item.originalSalePrice)}
          </DialogDescription>
          <DialogDescription>
            Precio al por mayor: {formatCurrency(item.wholeSalePrice)}
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel>
            <Text>Precio de venta</Text>
            <Text className="text-destructive">*</Text>
          </FieldLabel>
          <View className="flex flex-row gap-x-1">
            <Input
              value={value === 0 ? "" : value.toString()}
              onChangeText={(v) => onChangeSalePrice(v)}
              keyboardType="numeric"
              className="flex-1"
            />
            <Button variant="outline" size="icon" onPress={applyWholeSalePrice}>
              <Icon as={StarIcon} size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onPress={applyOriginalSalePrice}
            >
              <Icon as={Undo2Icon} size={20} />
            </Button>
          </View>
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          <Button onPress={onSaveNewSalePrice}>
            <Text>Guardar</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TicketItemCard({ item }: Props) {
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);
  const removeTicketItem = useTicketsStore((state) => state.removeTicketItem);
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

  const changeItemQuantity = useTicketsStore(
    (state) => state.changeItemQuantity
  );

  const setItemQuantity = useCallback(
    (quantity: string) => {
      if (quantity === "") {
        changeItemQuantity(currentTicketId, item.id, 0);
        return;
      }

      const quantityNumber = Number.parseInt(quantity);
      if (isNaN(quantityNumber)) return;

      changeItemQuantity(currentTicketId, item.id, quantityNumber);
    },
    [currentTicketId, item.id, changeItemQuantity]
  );

  const increaseItemQuantity = useCallback(
    (quantity: number) =>
      changeItemQuantity(currentTicketId, item.id, quantity + 1),
    [currentTicketId, changeItemQuantity, item.id]
  );

  const decreaseItemQuantity = useCallback(
    (quantity: number) =>
      changeItemQuantity(currentTicketId, item.id, quantity - 1),
    [currentTicketId, changeItemQuantity, item.id]
  );

  const removeItem = useCallback(() => {
    removeTicketItem(currentTicketId, item.id);
  }, [currentTicketId, item.id, removeTicketItem]);
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
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={item.quantity <= 1}
              onPress={() => decreaseItemQuantity(item.quantity)}
            >
              <Icon as={MinusIcon} size={18} />
            </Button>
            <View className="max-w-14">
              <Input
                value={item.quantity === 0 ? "" : item.quantity.toString()}
                onChangeText={(v) => setItemQuantity(v)}
                keyboardType="numeric"
              />
            </View>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={item.quantity >= item.stock}
              onPress={() => increaseItemQuantity(item.quantity)}
            >
              <Icon as={PlusIcon} size={18} />
            </Button>
          </View>
        </CardHeader>
        <CardContent className="px-2 flex items-end justify-center">
          <PriceDialog item={item} />
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
