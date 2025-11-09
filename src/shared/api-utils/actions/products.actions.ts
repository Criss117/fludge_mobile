import type { ProductCursor } from "@/shared/entities/cursor.entity";
import type {
  ProductDetail,
  ProductSummary,
} from "@/shared/entities/products.entity";
import type { CreateProductSchema } from "@/shared/schemas/products/create-product.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export type FindManyQueryParams = {
  limit?: number;
  base64Cursor?: string;
  nextCursor?: ProductCursor;
  name?: string;
  categoryId?: string;
};

type CreateProduct = {
  businessSlug: string;
  data: CreateProductSchema;
};

type FindOneProduct = {
  businessSlug: string;
  productSlug: string;
};

type FindManyProducts = {
  businessSlug: string;
  params?: FindManyQueryParams;
};

export class ProductsActions {
  constructor(private readonly api: API) {}

  public async create({ businessSlug, data }: CreateProduct) {
    const response = await safeAction(
      () =>
        this.api.post<null, CreateProductSchema>(
          ENDPOINTS.BUSINESSES.PRODUCTS.CREATE(businessSlug),
          data
        ),
      "Error al crear el producto"
    );

    return response;
  }

  public async findOne({ businessSlug, productSlug }: FindOneProduct) {
    const response = await safeAction(
      () =>
        this.api.get<ProductDetail>(
          ENDPOINTS.BUSINESSES.PRODUCTS.FIND_ONE(businessSlug, productSlug)
        ),
      "Error al obtener el producto"
    );

    return response;
  }

  public async findMany({ businessSlug, params }: FindManyProducts) {
    const response = await safeAction(
      () =>
        this.api.get<{
          items: ProductSummary[];
          nextCursor: string | null;
        }>(ENDPOINTS.BUSINESSES.PRODUCTS.FIND_MANY(businessSlug), {
          limit: params?.limit,
          nextCursor: params?.base64Cursor,
          name: params?.name,
          categoryId: params?.categoryId,
        }),
      "Error al obtener los productos"
    );

    return response;
  }
}
