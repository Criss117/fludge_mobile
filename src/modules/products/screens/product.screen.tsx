import type { ProductDetail } from "@/shared/entities/products.entity";
import { RefreshControl, ScrollView, View } from "react-native";
import { ProductDescriptionSection } from "../sections/product-description.section";
import { ProductHeaderSection } from "../sections/product-header.section";
import { ProductInventorySection } from "../sections/product-inventory.section";
import { ProductPricingSection } from "../sections/product-pricing.section";

interface Props {
  product: ProductDetail;
  isPending: boolean;
  refetch: () => void;
}

export function ProductScreen({ product, isPending, refetch }: Props) {
  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={refetch} />
      }
    >
      <View className="flex-1 flex gap-y-6 pb-10 px-4 pt-2">
        <ProductHeaderSection product={product} />
        <ProductDescriptionSection product={product} />
        <ProductPricingSection product={product} />
        <ProductInventorySection product={product} />
      </View>
    </ScrollView>
  );
}
