import { EnsureEmployeeIdsSchema } from "@/shared/schemas/groups/ensure-employee-ids.schema";
import { EnsurePermissionsSchema } from "@/shared/schemas/groups/ensure-permissions.schema";
import { mutationOptions } from "@tanstack/react-query";
import { GroupsActions } from "../../api-utils/actions/groups.actions";

type CreateGroupParams = Parameters<GroupsActions["create"]>[1] & {
  businessSlug: string;
};

type AddPermissionsParams = {
  businessSlug: string;
  groupId: string;
  values: EnsurePermissionsSchema;
};

type AssignEmployeesParams = {
  businessSlug: string;
  groupId: string;
  values: EnsureEmployeeIdsSchema;
};

type RemovePermissionsParams = AssignEmployeesParams;

export class GroupsMutationsOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  public create() {
    return mutationOptions({
      mutationFn: async (values: CreateGroupParams) => {
        const { businessSlug, ...data } = values;
        const response = await this.groupsActions.create(businessSlug, data);

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public addPermissions() {
    return mutationOptions({
      mutationFn: async (data: AddPermissionsParams) => {
        const { businessSlug, groupId, values } = data;
        const response = await this.groupsActions.addPermissions(
          businessSlug,
          groupId,
          values
        );

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public removePermissions() {
    return mutationOptions({
      mutationFn: async (data: AddPermissionsParams) => {
        const { businessSlug, groupId, values } = data;
        const response = await this.groupsActions.removePermissions(
          businessSlug,
          groupId,
          values
        );

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public assignEmployees() {
    return mutationOptions({
      mutationFn: async (data: AssignEmployeesParams) => {
        const { businessSlug, groupId, values } = data;
        const response = await this.groupsActions.assignEmployees(
          businessSlug,
          groupId,
          values
        );

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public removeEmployees() {
    return mutationOptions({
      mutationFn: async (data: RemovePermissionsParams) => {
        const { businessSlug, groupId, values } = data;
        const response = await this.groupsActions.removeEmployees(
          businessSlug,
          groupId,
          values
        );

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }
}
