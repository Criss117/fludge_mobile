import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { ProductDetail } from "@/shared/entities/products.entity";
import { View } from "react-native";
import { formatCurrency } from "../../shared/lib/utils";

interface Props {
  product: ProductDetail;
}

export function ProductPricingSection({ product }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h3">Información de precios</Text>
      <Card>
        <CardContent>
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Precio de compra
            </Text>
            <Text variant="large">
              $ {formatCurrency(product.purchasePrice)}
            </Text>
          </View>
          <Separator />
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Precio de venta
            </Text>
            <Text variant="large">$ {formatCurrency(product.salePrice)}</Text>
          </View>
          <Separator />
          <View className="flex items-center flex-row justify-between py-2">
            <Text variant="muted" className="text-muted-foreground">
              Precio al por mayor
            </Text>
            <Text variant="large">
              $ {formatCurrency(product.wholesalePrice)}
            </Text>
          </View>
          {product.offerPrice && (
            <>
              <Separator />
              <View className="flex items-center flex-row justify-between py-2">
                <Text variant="muted" className="text-muted-foreground">
                  Precio de oferta
                </Text>
                <Text variant="large">
                  $ {formatCurrency(product.offerPrice)}
                </Text>
              </View>
            </>
          )}
        </CardContent>
      </Card>
    </View>
  );
}
