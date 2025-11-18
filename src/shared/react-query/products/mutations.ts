import { ProductsActions } from "@/shared/api-utils/actions/products.actions";
import { mutationOptions } from "@tanstack/react-query";

type CreateProductParams = Parameters<ProductsActions["create"]>[number];
type UpdateProductParams = Parameters<ProductsActions["update"]>[number];
type DeleteManyProductsParams = Parameters<
  ProductsActions["deleteMany"]
>[number];

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

  public deleteMany() {
    return mutationOptions({
      mutationFn: async (data: DeleteManyProductsParams) => {
        const response = await this.productsActions.deleteMany(data);

        if (response.error) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response;
      },
    });
  }

  public update() {
    return mutationOptions({
      mutationFn: async (data: UpdateProductParams) => {
        const response = await this.productsActions.update(data);

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
