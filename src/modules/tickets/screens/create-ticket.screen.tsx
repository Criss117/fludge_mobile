import {
  CategoriesList,
  CategoriesListSkeleton,
} from "@/modules/products/components/categories-filter-list";
import {
  ProductsSearchInput,
  ProductsSearchInputSkeleton,
} from "@/modules/products/components/products-search-input";
import { ProductsFiltersProvider } from "@/modules/products/hooks/products-filters";
import { ProductsListSectionSkeleton } from "@/modules/products/sections/products-list.section";
import { ProductsSaleListSection } from "@/modules/products/sections/products-sale-list.section";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import { ProductSummary } from "@/shared/entities/products.entity";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TicketSummaryBottomSheet } from "../components/ticket-summary-bottom-sheet";
import { useTicketsStore } from "../store/tickets.store";

interface Props {
  categories: CategorySummary[];
  businessId: string;
}

export function CreateTicketScreen({ categories, businessId }: Props) {
  const addTicketItem = useTicketsStore((state) => state.addTicketItem);

  const onAddTicketItem = (item: ProductSummary) => {
    addTicketItem({
      barcode: item.barcode ?? "0",
      productId: item.id,
      quantity: 1,
      salePrice: item.salePrice,
      wholeSalePrice: item.wholesalePrice,
      originalSalePrice: item.salePrice,
      stock: item.stock,
      id: item.id,
      imageUrl: item.productImage,
      name: item.name,
    });
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <ProductsFiltersProvider>
        <View className="px-1 flex relative flex-1">
          <View className="py-2 px-1 flex gap-y-2">
            <ProductsSearchInput />
            <View className="py-2">
              <CategoriesList categories={categories} businessId={businessId} />
            </View>
          </View>
          <ProductsSaleListSection
            businessId={businessId}
            onPress={onAddTicketItem}
          />
        </View>
        <TicketSummaryBottomSheet businessId={businessId} />
      </ProductsFiltersProvider>
    </GestureHandlerRootView>
  );
}

export function ProductsScreenSkeleton() {
  return (
    <View className="px-1 flex relative flex-1">
      <View className="py-2 px-1 flex gap-y-2">
        <ProductsSearchInputSkeleton />
        <View className="py-2">
          <CategoriesListSkeleton />
        </View>
      </View>
      <ProductsListSectionSkeleton />
    </View>
  );
}
