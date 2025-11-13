import { Button } from "@/modules/shared/components/ui/button";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import { Link } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { View } from "react-native";
import { ProductsFiltersProvider } from "../hooks/products-filters";
import { ProductsHeaderSection } from "../sections/products-header.section";
import { ProductsListSection } from "../sections/products-list.section";

interface Props {
  categories: CategorySummary[];
  businessSlug: string;
}

export function ProductsScreen({ categories, businessSlug }: Props) {
  return (
    <ProductsFiltersProvider>
      <View className="px-1 flex relative flex-1">
        <ProductsHeaderSection categories={categories} />
        <ProductsListSection businessSlug={businessSlug} />
        <View className="absolute right-4 bottom-4">
          <Link
            href={{
              pathname: "/businesses/[businessSlug]/products/create",
              params: {
                businessSlug,
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
