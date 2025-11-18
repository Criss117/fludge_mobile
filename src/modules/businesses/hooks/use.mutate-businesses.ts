import { businessesMutationsOptions } from "@/integrations/query/query-container";
import { useMutation } from "@tanstack/react-query";

export function useMutateBusinesses() {
  const create = useMutation({
    ...businessesMutationsOptions.create(),
  });

  return {
    create,
  };
}
