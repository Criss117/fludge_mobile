import { businessQueriesOptions } from "@/integrations/query/query-container";
import { CreateProductScreen } from "@/modules/products/screens/create-product.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
  barcode?: string;
}

function Screen({ businessId, barcode }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <CreateProductScreen
      businessId={businessId}
      categories={business.categories}
      barcode={barcode}
    />
  );
}

export default function CreateProduct() {
  const { businessId, barcode } = useGlobalSearchParams<{
    businessId?: string;
    barcode?: string;
  }>();

  console.log({ barcode });

  if (!businessId) return null;

  return (
    <Suspense fallback={<Text>Cargando...</Text>}>
      <Screen businessId={businessId} barcode={barcode} />
    </Suspense>
  );
}
