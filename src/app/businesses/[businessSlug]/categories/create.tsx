import { CreateCategoryScreen } from "@/modules/products/screens/create-category.screen";
import { useGlobalSearchParams } from "expo-router";

export default function CreateCategory() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return <CreateCategoryScreen businessSlug={businessSlug} />;
}
