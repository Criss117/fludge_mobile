import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { ProductDetail } from "@/shared/entities/products.entity";
import { View } from "react-native";

interface Props {
  product: ProductDetail;
}

export function ProductInventorySection({ product }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h3">Inventario</Text>
      <Card>
        <CardContent>
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Stock
            </Text>
            <Text variant="large">{product.stock}</Text>
          </View>
          <Separator />
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Stock mínimo
            </Text>
            <Text variant="large">{product.minStock}</Text>
          </View>
          <Separator />
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Items vendidos
            </Text>
            <Text variant="large">{product.quentitySold}</Text>
          </View>
          <Separator />
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="large">
              {product.allowNegativeStock
                ? "Permite stock negativo"
                : "No permite stock negativo"}
            </Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
