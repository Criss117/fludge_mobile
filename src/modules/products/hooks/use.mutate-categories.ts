import {
  businessQueriesOptions,
  categoriesMutationsOptions,
} from "@/integrations/query/query-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateCategories() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...categoriesMutationsOptions.create(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );
    },
  });

  return {
    create,
  };
}
