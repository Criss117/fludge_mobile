import { mutationOptions } from "@tanstack/react-query";
import { GroupsActions } from "../../api-utils/actions/groups.actions";

type CreateGroupParams = Parameters<GroupsActions["create"]>[1] & {
  businessSlug: string;
};

export class GroupsMutationsOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  public async create() {
    return mutationOptions({
      mutationFn: async (values: CreateGroupParams) => {
        const { businessSlug, ...data } = values;
        const response = await this.groupsActions.create(businessSlug, data);

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response.data;
      },
    });
  }
}
