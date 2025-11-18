import { businessQueriesOptions } from "@/integrations/query/query-container";
import { ProductsScreen } from "@/modules/products/screens/products.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
  barcode?: string;
}

function SuspenseProducts({ businessId, barcode }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <ProductsScreen
      categories={business.categories}
      businessId={businessId}
      barcode={barcode}
    />
  );
}

export default function Products() {
  const { businessId, barcode } = useGlobalSearchParams<{
    businessId?: string;
    barcode?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<Text>Loading products...</Text>}>
      <SuspenseProducts businessId={businessId} barcode={barcode} />
    </Suspense>
  );
}
