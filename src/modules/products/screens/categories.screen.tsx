import { SearchInput } from "@/modules/shared/components/search-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { CategorySummary } from "@/shared/entities/categories.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { CategoryCard } from "../components/category-card";

interface Props {
  categories: CategorySummary[];
  businessId: string;
  isPending: boolean;
  refetch: () => void;
}

export function CategoriesScreen({
  categories,
  businessId,
  refetch,
  isPending,
}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const items = useMemo(() => {
    if (searchTerm === "") {
      return categories;
    }

    return categories.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, categories]);

  return (
    <View className="px-1 flex-1">
      <View className="py-2">
        <SearchInput
          placeholder="Buscar categorias"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard category={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListFooterComponent={<View className="h-4" />}
      />
      <View className="absolute right-4 bottom-4">
        <Link
          href={{
            pathname: "/businesses/[businessId]/categories/create",
            params: {
              businessId,
            },
          }}
          push
          asChild
        >
          <Button size="icon" className="rounded-full">
            <Icon as={PlusIcon} size={24} />
          </Button>
        </Link>
      </View>
    </View>
  );
}
