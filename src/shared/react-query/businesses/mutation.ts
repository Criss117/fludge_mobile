import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { CreateBusinessSchema } from "@/shared/schemas/businesses/create-business.schema";
import { mutationOptions } from "@tanstack/react-query";

export class BusinessesMutationsOptions {
  constructor(private readonly businessesActions: BusinessesActions) {}

  public create() {
    return mutationOptions({
      mutationKey: ["businesses", "create"],
      mutationFn: async (data: CreateBusinessSchema) => {
        const response = await this.businessesActions.create(data);

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
