import { Badge } from "@/modules/shared/components/ui/badge";
import { Input } from "@/modules/shared/components/ui/input";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import { CategorySummary } from "@/shared/entities/categories.entity";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useProductsList } from "../hooks/products-filters";

interface Props {
  categories: CategorySummary[];
}

interface CategoryBadgeProps {
  category: {
    id: string;
    name: string;
  };
  isSelected: boolean;
  onPress: (categoryId: string) => void;
  className?: string;
}

function CategoryBadge({
  category,
  isSelected,
  onPress,
  className,
}: CategoryBadgeProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Badge
      className={cn("rounded-full", className)}
      style={{
        transform: [
          {
            scale: isPressed ? 1.05 : 1,
          },
        ],
      }}
      variant={isSelected ? "default" : "outline"}
      asChild
    >
      <Pressable
        onPress={() => onPress(category.id)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text>{category.name}</Text>
      </Pressable>
    </Badge>
  );
}

function CategoriesList({ categories }: Props) {
  const { filters, filtersDispatch } = useProductsList();

  const selectedCategoryId = filters.categoryId;

  const onPressCategory = (categoryId: string | null) => {
    filtersDispatch({
      type: "set:categoryId",
      payload: categoryId,
    });
  };

  return (
    <FlatList
      horizontal
      data={categories}
      ListHeaderComponent={() => (
        <CategoryBadge
          category={{
            id: "all",
            name: "Todos",
          }}
          onPress={() => onPressCategory(null)}
          isSelected={selectedCategoryId === null}
          className="mx-1"
        />
      )}
      renderItem={({ item }) => (
        <CategoryBadge
          category={{
            id: item.id,
            name: item.name,
          }}
          onPress={(categoryId) => onPressCategory(categoryId)}
          isSelected={selectedCategoryId === item.id}
        />
      )}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="size-1" />}
    />
  );
}

export function ProductsHeaderSection({ categories }: Props) {
  return (
    <View className="py-2 px-1 flex gap-y-2">
      <Input placeholder="Buscar productos por nombre" />
      <View className="py-2">
        <CategoriesList categories={categories} />
      </View>
    </View>
  );
}
