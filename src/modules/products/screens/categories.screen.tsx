import { Text } from "@/modules/shared/components/ui/text";
import { CategorySummary } from "@/shared/entities/categories.entity";
import { FlatList, View } from "react-native";
import { CategoriesHeaderSection } from "../sections/categories-header.section";

interface Props {
  categories: CategorySummary[];
}

export function CategoriesScreen({ categories }: Props) {
  return (
    <View className="px-1">
      <CategoriesHeaderSection />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
      />
    </View>
  );
}
