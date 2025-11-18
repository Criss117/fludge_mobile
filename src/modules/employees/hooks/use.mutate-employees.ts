import {
  businessQueriesOptions,
  employeesMutationsOptions,
  employeesQueriesOptions,
  groupsQueriesOptions,
} from "@/integrations/query/query-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateEmployees() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...employeesMutationsOptions.create(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );
    },
  });

  const assignGroups = useMutation({
    ...employeesMutationsOptions.assignGroups(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        employeesQueriesOptions.findOne(
          variables.businessId,
          variables.employeeId
        )
      );

      variables.data.groupIds.forEach((groupId) => {
        queryClient.invalidateQueries(
          groupsQueriesOptions.findOne(variables.businessId, groupId)
        );
      });
    },
  });

  const removeGroups = useMutation({
    ...employeesMutationsOptions.removeGroups(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        employeesQueriesOptions.findOne(
          variables.businessId,
          variables.employeeId
        )
      );

      variables.data.groupIds.forEach((groupId) => {
        queryClient.invalidateQueries(
          groupsQueriesOptions.findOne(variables.businessId, groupId)
        );
      });
    },
  });

  return {
    create,
    assignGroups,
    removeGroups,
  };
}
