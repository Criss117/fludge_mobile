import { Input } from "@/modules/shared/components/ui/input";
import { ProductSummary } from "@/shared/entities/products.entity";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { ProductCard } from "../components/product-card";

interface Props {
  products: (ProductSummary & { empty?: boolean })[];
}

function completeEvenItems(
  items: (ProductSummary & { empty?: boolean })[],
  numColumns = 2
) {
  const numberOfFullRows = Math.floor(items.length / numColumns);

  let numberOfElementsLastRow = items.length - numberOfFullRows * numColumns;

  const dummyItem = items[items.length - 1];

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    items.push({
      ...dummyItem,
      id: `${dummyItem.id}-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow++;
  }

  return items;
}

export function ProductsScreen({ products }: Props) {
  const bottomTabBarHeight = useBottomTabBarHeight();

  const items = useMemo(() => {
    return completeEvenItems(products, 2);
  }, [products]);

  return (
    <View className="px-1 flex">
      <View className="py-2 px-1">
        <Input placeholder="Search products" />
      </View>
      <FlatList
        style={{ marginBottom: bottomTabBarHeight + 8, paddingHorizontal: 3 }}
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {item.empty && <View className="flex-1 mx-0.5" />}
            {!item.empty && (
              <ProductCard product={item} className="flex-1 mx-0.5" />
            )}
          </>
        )}
        ItemSeparatorComponent={() => <View className="size-1" />}
      />
    </View>
  );
}
