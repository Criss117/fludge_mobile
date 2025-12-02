import { Text } from "@/modules/shared/components/ui/text";
import { ProductSummary } from "@/shared/entities/products.entity";
import { Suspense } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { ProductCardSkeleton } from "../components/product-card";
import { ProductSaleCard } from "../components/product-sale-card";
import { useFindManyProducts } from "../hooks/use.find-many-products";

interface Props {
  businessId: string;
  onPress: (product: ProductSummary) => void;
}

function ProductsSaleListSectionSuspense({ businessId, onPress }: Props) {
  const {
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    items,
    fetchNextPage,
    refetch,
  } = useFindManyProducts({ businessId });

  return (
    <FlatList
      numColumns={2}
      data={items}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={2}
      renderItem={({ item }) => (
        <>
          {!item.empty && (
            <ProductSaleCard
              product={item}
              className="flex-1 mx-0.5"
              onPress={onPress}
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

export function ProductsSaleListSection(props: Props) {
  return (
    <Suspense fallback={<ProductsSaleListSectionSkeleton />}>
      <ProductsSaleListSectionSuspense {...props} />
    </Suspense>
  );
}

export function ProductsSaleListSectionSkeleton() {
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
