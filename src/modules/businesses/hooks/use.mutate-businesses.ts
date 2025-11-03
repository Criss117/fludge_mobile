import { businessesMutationsOptions } from "@/integrations/query/query-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateBusinesses() {
  const queryClient = useQueryClient();
  const create = useMutation({
    ...businessesMutationsOptions.create(),
  });

  return {
    create,
  };
}
