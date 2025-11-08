import { productsQueriesOptions } from "@/integrations/query/query-container";
import { ProductsScreen } from "@/modules/products/screens/producst.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessSlug: string;
}

function SuspenseProducts({ businessSlug }: Props) {
  const { data } = useSuspenseInfiniteQuery(
    productsQueriesOptions.findMany({
      businessSlug,
      params: {
        limit: 20,
      },
    })
  );

  const items = data.pages.flatMap((page) => page.items);

  return <ProductsScreen products={items} />;
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
