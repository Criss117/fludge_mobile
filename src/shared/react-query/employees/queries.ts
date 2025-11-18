import { EmployeesActions } from "@/shared/api-utils/actions/employees.actions";
import { queryOptions } from "@tanstack/react-query";

export class EmployeesQueriesOptions {
  constructor(private readonly employeeActions: EmployeesActions) {}

  public findOne(businessId: string, employeeId: string) {
    return queryOptions({
      queryKey: ["businesses", businessId, "employees", employeeId],
      queryFn: async () => {
        const response = await this.employeeActions.findOne(
          businessId,
          employeeId
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
