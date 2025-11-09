import { ProductsActions } from "@/shared/api-utils/actions/products.actions";
import {
  ProductCursor,
  productCursorSchema,
} from "@/shared/schemas/products/product-cursor.schema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import base64 from "react-native-base64";

type FindOneProductParams = Parameters<ProductsActions["findOne"]>[number];
type FindManyProductsParams = Parameters<ProductsActions["findMany"]>[number];

export class ProductsQueriesOptions {
  constructor(private readonly productsActions: ProductsActions) {}

  public findOne({ businessSlug, productSlug }: FindOneProductParams) {
    return queryOptions({
      queryKey: ["businesses", businessSlug, "products", productSlug],
      queryFn: async () => {
        const response = await this.productsActions.findOne({
          businessSlug,
          productSlug,
        });

        if (response.error || !response.data) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        return response.data;
      },
    });
  }

  public findMany({ businessSlug, params }: FindManyProductsParams) {
    let queryKey = ["businesses", businessSlug, "products"];

    if (params?.name) {
      queryKey = [...queryKey, "name", params.name];
    }

    if (params?.categoryId) {
      queryKey = [...queryKey, "categoryId", params.categoryId];
    }

    return infiniteQueryOptions({
      queryKey,
      initialPageParam: params?.base64Cursor,
      queryFn: async ({ pageParam }) => {
        const response = await this.productsActions.findMany({
          businessSlug,
          params: params ? { ...params, base64Cursor: pageParam } : undefined,
        });

        if (response.error || !response.data) {
          throw new Error(response.message, {
            cause: response.message,
          });
        }

        let cursor: ProductCursor | null = null;

        if (response.data.nextCursor) {
          const plainCursor = base64.decode(response.data.nextCursor);
          const obj = JSON.parse(plainCursor);

          const { data, error } = productCursorSchema.safeParse({
            lastCreatedAt: new Date(obj.lastCreatedAt),
            lastProductId: obj.lastProductId,
          });

          if (error) {
            throw new Error(error.message, {
              cause: error.message,
            });
          }

          cursor = data;
        }

        return {
          items: response.data.items,
          base64Cursor: response.data.nextCursor,
          nextCursor: cursor,
        };
      },
      getNextPageParam: (lastPage) => {
        return lastPage.base64Cursor;
      },
    });
  }
}
