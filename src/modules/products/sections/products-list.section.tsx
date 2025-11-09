import { productsQueriesOptions } from "@/integrations/query/query-container";
import { Text } from "@/modules/shared/components/ui/text";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ProductCard } from "../components/product-card";
import { useProductsFilters } from "../hooks/products-filters";

interface Props {
  businessSlug: string;
}

function ProductsListSectionSuspense({ businessSlug }: Props) {
  const { filters } = useProductsFilters();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      productsQueriesOptions.findMany({
        businessSlug,
        params: {
          limit: filters.limit,
          name: filters.name ?? undefined,
          categoryId: filters.categoryId ?? undefined,
        },
      })
    );

  const items = useMemo(() => {
    const products = data?.pages.flatMap((page) => page.items);

    if (!products) return [];

    // return completeEvenItems(products, 2);
    return products;
  }, [data.pages]);

  return (
    <>
      <FlatList
        style={{ marginBottom: bottomTabBarHeight, paddingHorizontal: 3 }}
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={2}
        renderItem={({ item }) => (
          <>
            <ProductCard product={item} className="flex-1 mx-0.5" />
            {/* {item.empty && <View className="flex-1 mx-0.5" />}
          {!item.empty && (
            )} */}
          </>
        )}
        ListFooterComponent={
          <View className="h-16 items-center justify-center">
            {isFetchingNextPage && <ActivityIndicator size={32} />}
            {!hasNextPage && <Text>No hay más productos</Text>}
          </View>
        }
        ItemSeparatorComponent={() => <View className="size-1" />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!hasNextPage) return;
          fetchNextPage();
        }}
      />
    </>
  );
}

export function ProductsListSection({ businessSlug }: Props) {
  return (
    <Suspense fallback={<Text>Loading Products...</Text>}>
      <ProductsListSectionSuspense businessSlug={businessSlug} />
    </Suspense>
  );
}
