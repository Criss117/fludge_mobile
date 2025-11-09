import type { CategorySummary } from "@/shared/entities/categories.entity";
import { View } from "react-native";
import { ProductsFiltersProvider } from "../hooks/products-filters";
import { ProductsHeaderSection } from "../sections/products-header.section";
import { ProductsListSection } from "../sections/products-list.section";

interface Props {
  categories: CategorySummary[];
  businessSlug: string;
}

export function ProductsScreen({ categories, businessSlug }: Props) {
  return (
    <ProductsFiltersProvider>
      <View className="px-1 flex">
        <ProductsHeaderSection categories={categories} />
        <ProductsListSection businessSlug={businessSlug} />
      </View>
    </ProductsFiltersProvider>
  );
}
