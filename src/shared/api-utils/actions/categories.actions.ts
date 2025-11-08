import { CreateCategorySchema } from "@/shared/schemas/products/create-category.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

type CreateCategory = {
  businessSlug: string;
  data: CreateCategorySchema;
};

export class CategoriesActions {
  constructor(private readonly api: API) {}

  public async create({ businessSlug, data }: CreateCategory) {
    const response = await safeAction(
      () =>
        this.api.post<null, CreateCategorySchema>(
          ENDPOINTS.BUSINESSES.CATEGORIES.CREATE(businessSlug),
          data
        ),
      "Error al crear la categoría"
    );

    return response;
  }
}
