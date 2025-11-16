import { ImagePickerButton } from "@/modules/shared/components/image-picker";
import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { env } from "@/modules/shared/lib/config";
import { ENDPOINTS } from "@/shared/api-utils/endpoints";
import { ProductDetail } from "@/shared/entities/products.entity";
import { Image, View } from "react-native";

interface Props {
  product: ProductDetail;
}

export function ProductHeaderSection({ product }: Props) {
  return (
    <Card className="py-0 pb-6">
      <CardHeader className="px-0 relative">
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
              uri: product.productImage.includes("http")
                ? product.productImage
                : `${env.EXPO_PUBLIC_API_URL}${ENDPOINTS.IMAGES.PRODUCTS(product.productImage)}`,
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
        <View className="absolute bottom-4 right-4">
          <ImagePickerButton
            businessSlug={product.business.slug}
            productSlug={product.slug}
          />
        </View>
      </CardHeader>
      <CardContent>
        {product.category && (
          <View className="flex items-start">
            <Badge className="rounded-full">
              <Text>{product.category.name}</Text>
            </Badge>
          </View>
        )}
        <Text variant="h3">{product.name}</Text>
        <Text className="text-muted-foreground" variant="muted">
          Código de barras: {product.barcode}
        </Text>
      </CardContent>
    </Card>
  );
}
