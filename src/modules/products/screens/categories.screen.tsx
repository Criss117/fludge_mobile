import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import { CategorySummary } from "@/shared/entities/categories.entity";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryCard } from "../components/category-card";
import { CategoriesHeaderSection } from "../sections/categories-header.section";

interface Props {
  categories: CategorySummary[];
  businessSlug: string;
  isPending: boolean;
  refetch: () => void;
}

export function CategoriesScreen({
  categories,
  businessSlug,
  refetch,
  isPending,
}: Props) {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="px-1 flex-1"
      style={{ paddingBottom: bottomTabBarHeight - bottom }}
    >
      <CategoriesHeaderSection />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard category={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListFooterComponent={<View className="h-4" />}
      />
      <View className="absolute right-4 bottom-4">
        <Link
          href={{
            pathname: "/businesses/[businessSlug]/categories/create",
            params: {
              businessSlug,
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
