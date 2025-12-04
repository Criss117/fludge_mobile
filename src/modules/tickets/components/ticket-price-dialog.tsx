import { Button } from "@/modules/shared/components/ui/button";
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
import { cn, formatCurrency } from "@/modules/shared/lib/utils";
import { PencilIcon, StarIcon, Undo2Icon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { TicketItemStore, useTicketsStore } from "../store/tickets.store";

interface Props {
  item: TicketItemStore;
  triggerClassName?: string;
}

export function TicketItemPriceDialog({ item, triggerClassName }: Props) {
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
        <Pressable
          className={cn("flex justify-center items-end", triggerClassName)}
        >
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
