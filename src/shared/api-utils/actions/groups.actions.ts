import type { GroupDetail, GroupSummary } from "@/shared/entities/group.entity";
import type { CreateGroupSchema } from "@/shared/schemas/groups/create-group.schema";
import { EnsureEmployeeIdsSchema } from "@/shared/schemas/groups/ensure-employee-ids.schema";
import type { EnsurePermissionsSchema } from "@/shared/schemas/groups/ensure-permissions.schema";
import { UpdateGroupSchema } from "@/shared/schemas/groups/update-group.scheam";
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

  public async update(
    businessSlug: string,
    groupId: string,
    values: UpdateGroupSchema
  ) {
    const response = await safeAction(() =>
      this.api.patch<null, UpdateGroupSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.UPDATE(businessSlug, groupId),
        values
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

  public async assignEmployees(
    businessSlug: string,
    groupId: string,
    values: EnsureEmployeeIdsSchema
  ) {
    const response = await safeAction(() =>
      this.api.post<null, EnsureEmployeeIdsSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.ASSING_EMPLOYEES(businessSlug, groupId),
        values
      )
    );

    return response;
  }

  public async removeEmployees(
    businessSlug: string,
    groupId: string,
    values: EnsureEmployeeIdsSchema
  ) {
    const response = await safeAction(() =>
      this.api.delete<null, EnsureEmployeeIdsSchema>(
        ENDPOINTS.BUSINESSES.GROUPS.REMOVE_EMPLOYEES(businessSlug, groupId),
        values
      )
    );

    return response;
  }
}
