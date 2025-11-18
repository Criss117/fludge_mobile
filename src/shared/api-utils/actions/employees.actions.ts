import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import type { CreateEmployeeSchema } from "@/shared/schemas/employees/create-employee.schema";
import { EnsureGroupIdsSchema } from "@/shared/schemas/employees/ensure-group-ids.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export class EmployeesActions {
  constructor(private readonly api: API) {}

  public async create(businessId: string, data: CreateEmployeeSchema) {
    const response = await safeAction(() =>
      this.api.post<EmployeeDetail, CreateEmployeeSchema>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.CREATE(businessId),
        data
      )
    );

    return response;
  }

  public async findOne(businessId: string, employeeId: string) {
    const response = await safeAction(() =>
      this.api.get<EmployeeDetail>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.FIND_ONE(businessId, employeeId)
      )
    );

    return response;
  }

  public async assignGroup(
    businessId: string,
    employeeId: string,
    values: EnsureGroupIdsSchema
  ) {
    const response = await safeAction(() =>
      this.api.post<null, EnsureGroupIdsSchema>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.ASSIGN_GROUP(businessId, employeeId),
        values
      )
    );

    return response;
  }

  public async removeGroup(
    businessId: string,
    employeeId: string,
    values: EnsureGroupIdsSchema
  ) {
    const response = await safeAction(() =>
      this.api.delete<null, EnsureGroupIdsSchema>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.REMOVE_GROUP(businessId, employeeId),
        values
      )
    );

    return response;
  }
}
