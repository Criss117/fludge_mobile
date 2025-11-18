import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { cn, formatCurrency } from "@/modules/shared/lib/utils";
import { ENDPOINTS } from "@/shared/api-utils/endpoints";
import { ProductSummary } from "@/shared/entities/products.entity";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { env } from "../../shared/lib/config";

interface Props {
  product: ProductSummary;
  businessId: string;
  className?: string;
}

export function ProductCard({ product, className, businessId }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  return (
    <Pressable
      className={cn(className)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        router.push({
          pathname: "/businesses/[businessId]/products/[productId]",
          params: {
            businessId,
            productId: product.id,
          },
        });
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: isPressed ? 1.02 : 1,
            },
          ],
          transitionProperty: "transform",
          transitionDuration: "50ms",
        }}
      >
        <Card className="py-2">
          <CardHeader className="px-2">
            {!product.productImage && (
              <Image
                source={require("@/assets/placeholder.png")}
                className="aspect-[20/21] rounded-lg"
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
                className="aspect-[20/21] rounded-lg"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            )}
          </CardHeader>
          <CardContent className="flex gap-y-2 px-2">
            <Text className="line-clamp-1">{product.name}</Text>
            <View>
              <Text variant="muted" className="text-muted-foreground">
                $ {formatCurrency(product.purchasePrice)}
              </Text>
              <Text>$ {formatCurrency(product.salePrice)}</Text>
              <Text variant="muted" className="text-muted-foreground">
                Unidades: {product.stock}
              </Text>
            </View>
          </CardContent>
        </Card>
      </Animated.View>
    </Pressable>
  );
}
