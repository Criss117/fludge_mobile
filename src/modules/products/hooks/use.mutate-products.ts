import {
  productsMutationsOptions,
  productsQueriesOptions,
} from "@/integrations/query/query-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateProducts() {
  const queyClient = useQueryClient();
  const create = useMutation({
    ...productsMutationsOptions.create(),
  });

  const update = useMutation({
    ...productsMutationsOptions.update(),
    onSuccess: (data, variables) => {
      queyClient.invalidateQueries(
        productsQueriesOptions.findOne({
          businessId: variables.businessId,
          productId: variables.productId,
        })
      );
    },
  });

  return {
    update,
    create,
  };
}
