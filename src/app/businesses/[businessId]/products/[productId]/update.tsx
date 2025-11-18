import {
  businessQueriesOptions,
  productsQueriesOptions,
} from "@/integrations/query/query-container";
import { UpdateProductScreen } from "@/modules/products/screens/update-product.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
  productId: string;
}

function Screen({ businessId, productId }: Props) {
  const { data: product } = useSuspenseQuery(
    productsQueriesOptions.findOne({
      businessId,
      productId,
    })
  );
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Actualizar: ${product.name}`,
        }}
      />
      <UpdateProductScreen
        product={product}
        businessId={business.id}
        categories={business.categories}
      />
    </>
  );
}

export default function UpdateProductPage() {
  const { businessId, productId } = useGlobalSearchParams<{
    businessId: string;
    productId: string;
  }>();

  if (!businessId || !productId) return null;

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Screen businessId={businessId} productId={productId} />
    </Suspense>
  );
}
