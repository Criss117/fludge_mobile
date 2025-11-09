import { businessQueriesOptions } from "@/integrations/query/query-container";
import { ProductsScreen } from "@/modules/products/screens/products.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessSlug: string;
}

function SuspenseProducts({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return (
    <ProductsScreen
      categories={business.categories}
      businessSlug={businessSlug}
    />
  );
}

export default function Products() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return (
    <Suspense fallback={<Text>Loading products...</Text>}>
      <SuspenseProducts businessSlug={businessSlug} />
    </Suspense>
  );
}
