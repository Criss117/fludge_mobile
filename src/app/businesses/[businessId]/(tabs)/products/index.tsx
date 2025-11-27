import { businessQueriesOptions } from "@/integrations/query/query-container";
import {
  ProductsScreen,
  ProductsScreenSkeleton,
} from "@/modules/products/screens/products.screen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
}

function SuspenseProducts({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <ProductsScreen categories={business.categories} businessId={businessId} />
  );
}

export default function Products() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<ProductsScreenSkeleton />}>
      <SuspenseProducts businessId={businessId} />
    </Suspense>
  );
}
