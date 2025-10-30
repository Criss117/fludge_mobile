import { GroupsActions } from "@/shared/api-utils/actions/groups.actions";
import { queryOptions } from "@tanstack/react-query";

export class GroupsQueriesOptions {
  constructor(private readonly groupsActions: GroupsActions) {}

  public findOne(businessSlug: string, groupId: string) {
    return queryOptions({
      queryKey: ["busineses", businessSlug, "groups", groupId],
      queryFn: async () => {
        const response = await this.groupsActions.findOne(
          businessSlug,
          groupId
        );

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
