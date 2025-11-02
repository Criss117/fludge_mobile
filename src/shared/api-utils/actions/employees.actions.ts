import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import type { CreateEmployeeSchema } from "@/shared/schemas/employees/create-employee.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export class EmployeesActions {
  constructor(private readonly api: API) {}

  public async create(businessSlug: string, data: CreateEmployeeSchema) {
    const response = await safeAction(() =>
      this.api.post<null, CreateEmployeeSchema>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.CREATE(businessSlug),
        data
      )
    );

    return response;
  }

  public async findOne(businessSlug: string, employeeId: string) {
    const response = await safeAction(() =>
      this.api.get<EmployeeDetail>(
        ENDPOINTS.BUSINESSES.EMPLOYEES.FIND_ONE(businessSlug, employeeId)
      )
    );

    return response;
  }
}
