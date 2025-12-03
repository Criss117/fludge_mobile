import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
import { Text } from "@/modules/shared/components/ui/text";
import { cn, formatCurrency } from "@/modules/shared/lib/utils";
import { ProductSummary } from "@/shared/entities/products.entity";
import * as Haptics from "expo-haptics";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { ProductImage } from "./product-image";

interface Props {
  product: ProductSummary;
  className?: string;
  onPress: (product: ProductSummary) => void;
}

export function ProductSaleCard({ product, className, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  const onCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(product);
  };

  return (
    <Pressable
      className={cn(className)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onCardPress}
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
        <Card
          className={cn(
            "py-2 relative",
            product.minStock > product.stock &&
              "border-orange-400 bg-orange-400/20",
            product.stock === 0 && "border-destructive bg-destructive/20"
          )}
        >
          <CardHeader className="px-2">
            <ProductImage productImage={product.productImage} />
          </CardHeader>
          <CardContent className="flex gap-y-2 px-2">
            <Text className="line-clamp-1">{product.name}</Text>
            <View>
              <Text variant="muted" className="text-muted-foreground">
                $ {formatCurrency(product.purchasePrice)}
              </Text>
              <Text>$ {formatCurrency(product.salePrice)}</Text>
              <Text
                variant="muted"
                className={cn(
                  "text-muted-foreground",
                  product.stock === 0 && "text-destructive"
                )}
              >
                Unidades: {product.stock}
              </Text>
              <Text
                variant="muted"
                className={cn(
                  "text-muted-foreground",
                  product.minStock > product.stock && "text-orange-400",
                  product.stock === 0 && "text-destructive"
                )}
              >
                Unidades mín: {product.minStock}
              </Text>
            </View>
          </CardContent>
          <View className="absolute right-4 bottom-4">
            <Button
              size="icon"
              className="rounded-full"
              variant="outline"
              onPress={onCardPress}
            >
              <Icon as={PlusIcon} size={24} />
            </Button>
          </View>
        </Card>
      </Animated.View>
    </Pressable>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("py-2", className)}>
      <CardHeader className="px-2">
        <Image
          source={require("@/assets/placeholder.png")}
          className="aspect-[20/21] rounded-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
          fadeDuration={100}
        />
      </CardHeader>
      <CardContent className="flex gap-y-2 px-2">
        <Skeleton className="h-4 w-full rounded-md bg-muted-foreground" />
        <View className="flex gap-y-1">
          <Text variant="muted" className="text-muted-foreground">
            <Skeleton className="h-3 w-1/2 rounded-md bg-muted-foreground" />
          </Text>
          <Text>
            <Skeleton className="h-3 w-1/2 rounded-md bg-muted-foreground" />
          </Text>
          <Text variant="muted" className="text-muted-foreground">
            <Skeleton className="h-3 w-1/3 rounded-md bg-muted-foreground" />
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
