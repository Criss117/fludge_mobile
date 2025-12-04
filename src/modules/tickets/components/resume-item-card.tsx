import { ProductImage } from "@/modules/products/components/product-image";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { TrashIcon } from "lucide-react-native";
import { View } from "react-native";
import { useTicketActions } from "../hooks/use.ticket-actions";
import { type TicketItemStore } from "../store/tickets.store";
import { QuantityButtons } from "./quantity-buttons";
import { TicketItemPriceDialog } from "./ticket-price-dialog";

interface Props {
  item: TicketItemStore;
}

export function ResumeTicketItemCard({ item }: Props) {
  const {
    decreaseItemQuantity,
    increaseItemQuantity,
    setItemQuantity,
    removeItem,
  } = useTicketActions({ itemId: item.id });

  return (
    <Card className="flex flex-row gap-2 px-2">
      <CardHeader className="px-0 size-28">
        <ProductImage productImage={item.imageUrl} width={112} height={112} />
      </CardHeader>
      <CardContent className="px-2 flex-1 items-start flex gap-y-2 h-40">
        <View className="flex-1 flex-row justify-between">
          <Text className="line-clamp-2 text-xl font-semibold flex-1">
            {item.name}
          </Text>
          <Button
            className="rounded-full"
            variant="destructive"
            size="icon"
            onPress={removeItem}
          >
            <Icon as={TrashIcon} className="text-white" size={18} />
          </Button>
        </View>
        <View className="flex flex-row gap-x-1">
          <QuantityButtons
            decreaseItemQuantity={decreaseItemQuantity}
            increaseItemQuantity={increaseItemQuantity}
            setItemQuantity={setItemQuantity}
            quantity={item.quantity}
            stock={item.stock}
          />
        </View>
        <TicketItemPriceDialog item={item} triggerClassName="items-start" />
      </CardContent>
    </Card>
  );
}
