import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { ProductDetail } from "@/shared/entities/products.entity";
import { Image, View } from "react-native";

interface Props {
  product: ProductDetail;
}

export function ProductHeaderSection({ product }: Props) {
  return (
    <View>
      {!product.productImage && (
        <Image
          source={require("@/assets/placeholder.png")}
          className="aspect-[20/21] rounded-t-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
          fadeDuration={100}
        />
      )}
      {product.productImage && (
        <Image
          source={{
            uri: product.productImage,
          }}
          loadingIndicatorSource={require("@/assets/placeholder.png")}
          fadeDuration={100}
          className="aspect-[20/21] rounded-t-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      )}
      <Card className="rounded-t-none">
        <CardHeader>
          <View className="flex items-start">
            {product.category && (
              <Badge className="rounded-full">
                <Text>{product.category.name}</Text>
              </Badge>
            )}
          </View>
          <CardTitle variant="h3">{product.name}</CardTitle>
          <CardDescription>Código de barras: {product.barcode}</CardDescription>
        </CardHeader>
      </Card>
    </View>
  );
}
