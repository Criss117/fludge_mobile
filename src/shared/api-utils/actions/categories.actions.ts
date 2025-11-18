import type { CategorySummary } from "@/shared/entities/categories.entity";
import type { CreateCategorySchema } from "@/shared/schemas/products/create-category.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

type CreateCategory = {
  businessId: string;
  data: CreateCategorySchema;
};

export class CategoriesActions {
  constructor(private readonly api: API) {}

  public async create({ businessId, data }: CreateCategory) {
    const response = await safeAction(
      () =>
        this.api.post<CategorySummary[], CreateCategorySchema>(
          ENDPOINTS.BUSINESSES.CATEGORIES.CREATE(businessId),
          data
        ),
      "Error al crear la categoría"
    );

    return response;
  }
}
