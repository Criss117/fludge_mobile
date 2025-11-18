import { CreateCategoryScreen } from "@/modules/products/screens/create-category.screen";
import { useGlobalSearchParams } from "expo-router";

export default function CreateCategory() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return <CreateCategoryScreen businessId={businessId} />;
}
