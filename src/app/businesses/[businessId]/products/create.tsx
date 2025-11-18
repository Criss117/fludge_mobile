import { businessQueriesOptions } from "@/integrations/query/query-container";
import { CreateProductScreen } from "@/modules/products/screens/create-product.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
}

function Screen({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <CreateProductScreen
      businessId={businessId}
      categories={business.categories}
    />
  );
}

export default function CreateProduct() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<Text>Cargando...</Text>}>
      <Screen businessId={businessId} />
    </Suspense>
  );
}
