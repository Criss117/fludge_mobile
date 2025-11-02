import { EmployeesActions } from "@/shared/api-utils/actions/employees.actions";
import { queryOptions } from "@tanstack/react-query";

export class EmployeesQueriesOptions {
  constructor(private readonly employeeActions: EmployeesActions) {}

  public findOne(businessSlug: string, employeeId: string) {
    return queryOptions({
      queryKey: ["businesses", businessSlug, "employees", employeeId],
      queryFn: async () => {
        const response = await this.employeeActions.findOne(
          businessSlug,
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
