import { EmployeesActions } from "@/shared/api-utils/actions/employees.actions";
import type { CreateEmployeeSchema } from "@/shared/schemas/employees/create-employee.schema";
import { EnsureGroupIdsSchema } from "@/shared/schemas/employees/ensure-group-ids.schema";
import { mutationOptions } from "@tanstack/react-query";

type CreateEmployeeParams = {
  businessId: string;
  data: CreateEmployeeSchema;
};

type AssignOrRemoveGroupParams = {
  businessId: string;
  employeeId: string;
  data: EnsureGroupIdsSchema;
};

export class EmployeesMutationsOptions {
  constructor(private readonly employeesActions: EmployeesActions) {}

  public create() {
    return mutationOptions({
      mutationKey: ["businesses", "employees", "create"],
      mutationFn: async ({ businessId, data }: CreateEmployeeParams) => {
        const response = await this.employeesActions.create(businessId, data);

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public assignGroups() {
    return mutationOptions({
      mutationKey: ["businesses", "employees", "assign-groups"],
      mutationFn: async ({
        businessId,
        employeeId,
        data,
      }: AssignOrRemoveGroupParams) => {
        const response = await this.employeesActions.assignGroup(
          businessId,
          employeeId,
          data
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

  public removeGroups() {
    return mutationOptions({
      mutationKey: ["businesses", "employees", "remove-groups"],
      mutationFn: async ({
        businessId,
        employeeId,
        data,
      }: AssignOrRemoveGroupParams) => {
        const response = await this.employeesActions.removeGroup(
          businessId,
          employeeId,
          data
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
