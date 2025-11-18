import { GroupsActions } from "@/shared/api-utils/actions/groups.actions";
import { queryOptions } from "@tanstack/react-query";

export class GroupsQueriesOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  public findOne(businessId: string, groupId: string) {
    return queryOptions({
      queryKey: ["busineses", businessId, "groups", groupId],
      queryFn: async () => {
        const response = await this.groupsActions.findOne(businessId, groupId);

        if (response.error || !response.data) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response.data;
      },
    });
  }
}
