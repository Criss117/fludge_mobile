import { productsQueriesOptions } from "@/integrations/query/query-container";
import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { ProductMenuActions } from "@/modules/products/components/product-menu-actions";
import { ProductScreen } from "@/modules/products/screens/product.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";

interface Props {
  businessId: string;
  productId: string;
}

function ProductSuspense({ businessId, productId }: Props) {
  const {
    data: product,
    isRefetching,
    refetch,
  } = useSuspenseQuery(
    productsQueriesOptions.findOne({
      businessId,
      productId,
    })
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <ProductMenuActions productId={productId} businessId={businessId} />
          ),
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
  const { businessId, productId } = useGlobalSearchParams<{
    businessId?: string;
    productId?: string;
  }>();

  if (!businessId || !productId) return null;

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
      <ProductSuspense businessId={businessId} productId={productId} />
    </Suspense>
  );
}
