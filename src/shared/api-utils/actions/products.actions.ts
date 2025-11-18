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
  barcode?: string;
};

type CreateProduct = {
  businessId: string;
  data: CreateProductSchema;
};

type FindOneProduct = {
  businessId: string;
  productId: string;
};

type FindManyProducts = {
  businessId: string;
  params?: FindManyQueryParams;
};

export class ProductsActions {
  constructor(private readonly api: API) {}

  public async create({ businessId, data }: CreateProduct) {
    const response = await safeAction(
      () =>
        this.api.post<ProductSummary, CreateProductSchema>(
          ENDPOINTS.BUSINESSES.PRODUCTS.CREATE(businessId),
          data
        ),
      "Error al crear el producto"
    );

    return response;
  }

  public async findOne({ businessId, productId }: FindOneProduct) {
    const response = await safeAction(
      () =>
        this.api.get<ProductDetail>(
          ENDPOINTS.BUSINESSES.PRODUCTS.FIND_ONE(businessId, productId)
        ),
      "Error al obtener el producto"
    );

    return response;
  }

  public async findMany({ businessId, params }: FindManyProducts) {
    const response = await safeAction(
      () =>
        this.api.get<{
          items: ProductSummary[];
          nextCursor: string | null;
        }>(ENDPOINTS.BUSINESSES.PRODUCTS.FIND_MANY(businessId), {
          limit: params?.limit,
          nextCursor: params?.base64Cursor,
          name: params?.name,
          categoryId: params?.categoryId,
          barcode: params?.barcode,
        }),
      "Error al obtener los productos"
    );

    return response;
  }
}
