import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { View } from "react-native";
import { CategoriesList } from "../components/categories-filter-list";
import { ProductsSearchInput } from "../components/products-search-input";
import { ProductsFiltersProvider } from "../hooks/products-filters";
import { ProductsListSection } from "../sections/products-list.section";

interface Props {
  categories: CategorySummary[];
  businessId: string;
  barcode?: string;
}

export function ProductsScreen({ categories, businessId, barcode }: Props) {
  return (
    <ProductsFiltersProvider>
      <View className="px-1 flex relative flex-1">
        <View className="py-2 px-1 flex gap-y-2">
          <ProductsSearchInput
            businessId={businessId}
            defaultBarcode={barcode}
          />
          <View className="py-2">
            <CategoriesList categories={categories} businessId={businessId} />
          </View>
        </View>
        <ProductsListSection businessId={businessId} />
        <View className="absolute right-4 bottom-4">
          <Link
            href={{
              pathname: "/businesses/[businessId]/products/create",
              params: {
                businessId,
              },
            }}
            push
            asChild
          >
            <Button size="icon" className="rounded-full">
              <Icon as={PlusIcon} size={24} className="text-white" />
            </Button>
          </Link>
        </View>
      </View>
    </ProductsFiltersProvider>
  );
}
