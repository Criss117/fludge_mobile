import { productsQueriesOptions } from "@/integrations/query/query-container";
import { Text } from "@/modules/shared/components/ui/text";
import { completeEvenItems } from "@/modules/shared/lib/complete-even-items";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { ProductCard, ProductCardSkeleton } from "../components/product-card";
import { useProductsFilters } from "../hooks/products-filters";

interface Props {
  businessId: string;
}

function ProductsListSectionSuspense({ businessId }: Props) {
  const { filters } = useProductsFilters();

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useSuspenseInfiniteQuery(
    productsQueriesOptions.findMany({
      businessId,
      params: {
        limit: filters.limit,
        name: filters.name ?? undefined,
        categoryId: filters.categoryId ?? undefined,
        barcode: filters.barcode ?? undefined,
      },
    })
  );

  const items = useMemo(() => {
    const products = data?.pages.flatMap((page) => page.items);

    if (!products) return [];

    return completeEvenItems(products, 2);
  }, [data.pages]);

  return (
    <FlatList
      numColumns={2}
      data={items}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={2}
      renderItem={({ item }) => (
        <>
          {!item.empty && (
            <ProductCard
              product={item}
              className="flex-1 mx-0.5"
              businessId={businessId}
            />
          )}
          {item.empty && <View className="flex-1 mx-0.5 " />}
        </>
      )}
      ListFooterComponent={
        <View className="items-center justify-center h-20">
          {isFetchingNextPage && <ActivityIndicator size={32} />}
          {!hasNextPage && <Text>No hay más productos</Text>}
        </View>
      }
      ItemSeparatorComponent={() => <View className="size-1" />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!hasNextPage) return;
        fetchNextPage();
      }}
    />
  );
}

export function ProductsListSection({ businessId }: Props) {
  return (
    <Suspense fallback={<ProductsListSectionSkeleton />}>
      <ProductsListSectionSuspense businessId={businessId} />
    </Suspense>
  );
}

export function ProductsListSectionSkeleton() {
  return (
    <FlatList
      numColumns={2}
      data={Array.from({ length: 6 })}
      keyExtractor={() => Math.random().toString()}
      maxToRenderPerBatch={2}
      renderItem={() => <ProductCardSkeleton className="flex-1 mx-0.5" />}
      ItemSeparatorComponent={() => <View className="size-1" />}
    />
  );
}
