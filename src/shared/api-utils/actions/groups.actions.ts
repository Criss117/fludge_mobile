import type { GroupDetail, GroupSummary } from "@/shared/entities/group.entity";
import { CreateGroupSchema } from "@/shared/schemas/groups/create-group.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export class GroupsActions {
  constructor(private readonly api: API) {}

  public async create(businessSlug: string, data: CreateGroupSchema) {
    const response = await safeAction(() =>
      this.api.post<GroupSummary, CreateGroupSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.CREATE(businessSlug),
        data
      )
    );

    return response;
  }

  public async findOne(businessSlug: string, groupId: string) {
    const response = await safeAction(() =>
      this.api.get<GroupDetail>(
        ENDPOINTS.BUSINESSES.GROUPS.FIND_ONE(businessSlug, groupId)
      )
    );

    return response;
  }
}
