import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { ProductDetail } from "@/shared/entities/products.entity";
import { View } from "react-native";

interface Props {
  product: ProductDetail;
}

export function ProductDescriptionSection({ product }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h3">Descripción</Text>
      <Card>
        <CardContent>
          {!product.description && (
            <Text variant="muted" className="italic">
              No hay descripción
            </Text>
          )}
          {product.description && <Text>{product.description}</Text>}
        </CardContent>
      </Card>
    </View>
  );
}
