import type { GroupDetail, GroupSummary } from "@/shared/entities/group.entity";
import type { CreateGroupSchema } from "@/shared/schemas/groups/create-group.schema";
import type { EnsurePermissionsSchema } from "@/shared/schemas/groups/ensure-permissions.schema";
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

  public async addPermissions(
    businessSlug: string,
    groupId: string,
    values: EnsurePermissionsSchema
  ) {
    const response = await safeAction(() =>
      this.api.patch<null, EnsurePermissionsSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.ADD_PERMISSION(businessSlug, groupId),
        values
      )
    );

    return response;
  }
  public async removePermissions(
    businessSlug: string,
    groupId: string,
    values: EnsurePermissionsSchema
  ) {
    const response = await safeAction(() =>
      this.api.delete<null, EnsurePermissionsSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.REMOVE_PERMISSION(businessSlug, groupId),
        values
      )
    );

    return response;
  }
}
