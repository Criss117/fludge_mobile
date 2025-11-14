import { productsMutationsOptions } from "@/integrations/query/query-container";
import { useMutation } from "@tanstack/react-query";

export function useMutateProducts() {
  const create = useMutation({
    ...productsMutationsOptions.create(),
  });

  return {
    create,
  };
}
