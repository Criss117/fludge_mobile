import type {
  BusinessDetail,
  BusinessSummary,
} from "@/shared/entities/business.entity";
import type { CreateBusinessSchema } from "@/shared/schemas/businesses/create-business.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export class BusinessesActions {
  constructor(private readonly api: API) {}

  public async create(data: CreateBusinessSchema) {
    const res = await safeAction(
      () =>
        this.api.post<BusinessSummary, CreateBusinessSchema>(
          `businesses`,
          data
        ),
      "Error al crear un negocio"
    );

    return res;
  }

  public async findOne(slug: string) {
    const res = await safeAction(
      () => this.api.get<BusinessDetail>(ENDPOINTS.BUSINESSES.FIND_ONE(slug)),
      "Error al buscar negocio"
    );

    return res;
  }
}
