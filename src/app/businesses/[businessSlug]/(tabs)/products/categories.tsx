import { businessQueriesOptions } from "@/integrations/query/query-container";
import { CategoriesScreen } from "@/modules/products/screens/categories.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

interface Props {
  businessSlug: string;
}

function CategoriesSuspense({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return <CategoriesScreen categories={business.categories} />;
}

export default function Categories() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return (
    <Suspense fallback={<Text>Loading categories...</Text>}>
      <CategoriesSuspense businessSlug={businessSlug} />
    </Suspense>
  );
}
