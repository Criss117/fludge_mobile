import { productsQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { ProductScreen } from "@/modules/products/screens/product.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessSlug: string;
  productSlug: string;
}

function ProductSuspense({ businessSlug, productSlug }: Props) {
  const {
    data: product,
    isRefetching,
    refetch,
  } = useSuspenseQuery(
    productsQueriesOptions.findOne({
      businessSlug,
      productSlug,
    })
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: product.name,
        }}
      />
      <ProductScreen
        product={product}
        isPending={isRefetching}
        refetch={refetch}
      />
    </>
  );
}

export default function Product() {
  const { hasPermission } = usePermissions();
  const { businessSlug, productSlug } = useGlobalSearchParams<{
    businessSlug?: string;
    productSlug?: string;
  }>();

  if (!businessSlug || !productSlug) return null;

  const userCanReadProduct = hasPermission("products:read");

  if (!userCanReadProduct)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para ver grupos"]}
        />
      </View>
    );

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ProductSuspense businessSlug={businessSlug} productSlug={productSlug} />
    </Suspense>
  );
}
