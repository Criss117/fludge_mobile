import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { queryOptions } from "@tanstack/react-query";

export class BusinessQueriesOptions {
  constructor(private readonly businessesActions: BusinessesActions) {}

  public findOne(slug: string) {
    return queryOptions({
      queryKey: ["businesses", slug],
      queryFn: async () => {
        const response = await this.businessesActions.findOne(slug);

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
