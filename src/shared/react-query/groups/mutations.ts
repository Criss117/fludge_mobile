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
}
