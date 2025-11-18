import { businessQueriesOptions } from "@/integrations/query/query-container";
import { CategoriesScreen } from "@/modules/products/screens/categories.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

interface Props {
  businessId: string;
}

function CategoriesSuspense({ businessId }: Props) {
  const {
    data: business,
    isRefetching,
    refetch,
  } = useSuspenseQuery(businessQueriesOptions.findOne(businessId));

  return (
    <CategoriesScreen
      categories={business.categories}
      businessId={businessId}
      isPending={isRefetching}
      refetch={() => refetch()}
      key={isRefetching ? "pending" : "ready"}
    />
  );
}

export default function Categories() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<Text>Loading categories...</Text>}>
      <CategoriesSuspense businessId={businessId} />
    </Suspense>
  );
}
