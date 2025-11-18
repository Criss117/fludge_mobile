import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { queryOptions } from "@tanstack/react-query";

export class BusinessQueriesOptions {
  constructor(private readonly businessesActions: BusinessesActions) {}

  public findOne(businessId: string) {
    return queryOptions({
      queryKey: ["businesses", businessId],
      queryFn: async () => {
        const response = await this.businessesActions.findOne(businessId);

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
