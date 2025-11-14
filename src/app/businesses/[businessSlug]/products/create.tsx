import { businessQueriesOptions } from "@/integrations/query/query-container";
import { CreateProductScreen } from "@/modules/products/screens/create-product.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessSlug: string;
}

function Screen({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return (
    <CreateProductScreen
      businessSlug={businessSlug}
      categories={business.categories}
    />
  );
}

export default function CreateProduct() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return (
    <Suspense fallback={<Text>Cargando...</Text>}>
      <Screen businessSlug={businessSlug} />
    </Suspense>
  );
}
