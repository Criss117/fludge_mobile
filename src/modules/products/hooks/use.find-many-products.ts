import { productsQueriesOptions } from "@/integrations/query/query-container";
import { completeEvenItems } from "@/modules/shared/lib/complete-even-items";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useProductsFilters } from "./products-filters";

interface Props {
  businessId: string;
}

export function useFindManyProducts({ businessId }: Props) {
  const { filters } = useProductsFilters();

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useSuspenseInfiniteQuery(
    productsQueriesOptions.findMany({
      businessId,
      params: {
        limit: filters.limit,
        name: filters.name ?? undefined,
        categoryId: filters.categoryId ?? undefined,
        barcode: filters.barcode ?? undefined,
      },
    })
  );

  const items = useMemo(() => {
    const products = data?.pages.flatMap((page) => page.items);

    if (!products) return [];

    return completeEvenItems(products, 2);
  }, [data.pages]);

  return {
    items,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    refetch,
  };
}
