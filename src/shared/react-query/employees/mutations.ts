import { EmployeesActions } from "@/shared/api-utils/actions/employees.actions";
import type { CreateEmployeeSchema } from "@/shared/schemas/employees/create-employee.schema";
import { mutationOptions } from "@tanstack/react-query";

type CreateEmployeeParams = {
  businessSlug: string;
  data: CreateEmployeeSchema;
};

export class EmployeesMutationsOptions {
  constructor(private readonly employeesActions: EmployeesActions) {}

  public create() {
    return mutationOptions({
      mutationKey: ["businesses", "employees", "create"],
      mutationFn: async ({ businessSlug, data }: CreateEmployeeParams) => {
        const response = await this.employeesActions.create(businessSlug, data);

        if (response.error || !response.data) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }
}
