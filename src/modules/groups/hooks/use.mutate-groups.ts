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
        businessQueriesOptions.findOne(variables.businessSlug)
      );
    },
  });

  const addPermissions = useMutation({
    ...groupsMutationsOptions.addPermissions(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessSlug)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessSlug, variables.groupId)
      );
    },
  });

  const removePermissions = useMutation({
    ...groupsMutationsOptions.removePermissions(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        businessQueriesOptions.findOne(variables.businessSlug)
      );

      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessSlug, variables.groupId)
      );
    },
  });

  const assignEmployees = useMutation({
    ...groupsMutationsOptions.assignEmployees(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessSlug, variables.groupId)
      );
    },
  });

  const removeEmployees = useMutation({
    ...groupsMutationsOptions.removeEmployees(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        groupsQueriesOptions.findOne(variables.businessSlug, variables.groupId)
      );
    },
  });

  return {
    create,
    addPermissions,
    removePermissions,
    assignEmployees,
    removeEmployees,
  };
}
