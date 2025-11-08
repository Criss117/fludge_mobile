import { ProductsActions } from "@/shared/api-utils/actions/products.actions";
import { mutationOptions } from "@tanstack/react-query";

type CreateProductParams = Parameters<ProductsActions["create"]>[number];

export class ProductsMutationsOptions {
  constructor(private readonly productsActions: ProductsActions) {}

  public create() {
    return mutationOptions({
      mutationFn: async (data: CreateProductParams) => {
        const response = await this.productsActions.create(data);

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
