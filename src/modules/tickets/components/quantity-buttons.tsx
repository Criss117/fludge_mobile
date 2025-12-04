import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  decreaseItemQuantity: (quantity: number) => void;
  increaseItemQuantity: (quantity: number) => void;
  setItemQuantity: (quantity: string) => void;
  quantity: number;
  stock: number;
}

export function QuantityButtons({
  quantity,
  stock,
  decreaseItemQuantity,
  increaseItemQuantity,
  setItemQuantity,
}: Props) {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        disabled={quantity <= 1}
        onPress={() => decreaseItemQuantity(quantity)}
      >
        <Icon as={MinusIcon} size={18} />
      </Button>
      <View className="max-w-14">
        <Input
          value={quantity === 0 ? "" : quantity.toString()}
          onChangeText={(v) => setItemQuantity(v)}
          keyboardType="numeric"
        />
      </View>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        disabled={quantity >= stock}
        onPress={() => increaseItemQuantity(quantity)}
      >
        <Icon as={PlusIcon} size={18} />
      </Button>
    </>
  );
}
