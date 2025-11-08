import { CategoriesActions } from "@/shared/api-utils/actions/categories.actions";
import { mutationOptions } from "@tanstack/react-query";

type CreateCategoryParams = Parameters<CategoriesActions["create"]>[number];

export class CategoriesMutationsOptions {
  constructor(private readonly categoriesActions: CategoriesActions) {}

  public create() {
    return mutationOptions({
      mutationFn: async (data: CreateCategoryParams) => {
        const response = await this.categoriesActions.create(data);

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
