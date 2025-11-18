import {
  businessQueriesOptions,
  groupsMutationsOptions,
  groupsQueriesOptions,
} from "@/integrations/query/query-container";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateGroups() {
  const queryClient = useQueryClient();

  const create = useMutation({
    ...groupsMutationsOptions.create(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );
    },
  });

  const update = useMutation({
    ...groupsMutationsOptions.update(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessId, variables.groupId)
      );
    },
  });

  const addPermissions = useMutation({
    ...groupsMutationsOptions.addPermissions(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessId, variables.groupId)
      );
    },
  });

  const removePermissions = useMutation({
    ...groupsMutationsOptions.removePermissions(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessId)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessId, variables.groupId)
      );
    },
  });

  const assignEmployees = useMutation({
    ...groupsMutationsOptions.assignEmployees(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessId, variables.groupId)
      );
    },
  });

  const removeEmployees = useMutation({
    ...groupsMutationsOptions.removeEmployees(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessId, variables.groupId)
      );
    },
  });

  return {
    create,
    update,
    addPermissions,
    removePermissions,
    assignEmployees,
    removeEmployees,
  };
}
