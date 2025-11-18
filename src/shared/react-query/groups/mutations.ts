import { CreateGroupSchema } from "@/shared/schemas/groups/create-group.schema";
import { EnsureEmployeeIdsSchema } from "@/shared/schemas/groups/ensure-employee-ids.schema";
import { EnsurePermissionsSchema } from "@/shared/schemas/groups/ensure-permissions.schema";
import { UpdateGroupSchema } from "@/shared/schemas/groups/update-group.scheam";
import { mutationOptions } from "@tanstack/react-query";
import { GroupsActions } from "../../api-utils/actions/groups.actions";

type CreateGroupParams = {
  businessId: string;
  data: CreateGroupSchema;
};

type UpdateGroupParams = {
  businessId: string;
  groupId: string;
  values: UpdateGroupSchema;
};

type AddPermissionsParams = {
  businessId: string;
  groupId: string;
  values: EnsurePermissionsSchema;
};

type AssignEmployeesParams = {
  businessId: string;
  groupId: string;
  values: EnsureEmployeeIdsSchema;
};

type RemovePermissionsParams = AssignEmployeesParams;

export class GroupsMutationsOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  public create() {
    return mutationOptions({
      mutationFn: async (values: CreateGroupParams) => {
        const { businessId, data } = values;
        const response = await this.groupsActions.create(businessId, data);

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public update() {
    return mutationOptions({
      mutationFn: async (data: UpdateGroupParams) => {
        const { businessId, groupId, values } = data;
        const response = await this.groupsActions.update(
          businessId,
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

  public addPermissions() {
    return mutationOptions({
      mutationFn: async (data: AddPermissionsParams) => {
        const { businessId, groupId, values } = data;
        const response = await this.groupsActions.addPermissions(
          businessId,
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
        const { businessId, groupId, values } = data;
        const response = await this.groupsActions.removePermissions(
          businessId,
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
        const { businessId, groupId, values } = data;
        const response = await this.groupsActions.assignEmployees(
          businessId,
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
        const { businessId, groupId, values } = data;
        const response = await this.groupsActions.removeEmployees(
          businessId,
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
