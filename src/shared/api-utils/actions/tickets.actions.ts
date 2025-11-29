import { TicketItemSummary } from "@/shared/entities/ticket-items.entity";
import { TicketSummary } from "@/shared/entities/tickets.entity";
import type { CreateTicketSchema } from "@/shared/schemas/tickets/create-ticket.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

type CreateParams = {
  businessId: string;
  data: CreateTicketSchema;
};

export class TicketsActions {
  constructor(private readonly api: API) {}

  public async create({ businessId, data }: CreateParams) {
    const res = await safeAction(
      () =>
        this.api.post<
          TicketSummary & {
            items: TicketItemSummary[];
          },
          CreateTicketSchema
        >(ENDPOINTS.BUSINESSES.TICKETS.CREATE(businessId), data),
      "Error al crear ticket"
    );

    return res;
  }

  public async findMany(businessId: string) {
    const res = await safeAction(
      () =>
        this.api.get<TicketSummary[]>(
          ENDPOINTS.BUSINESSES.TICKETS.FIND_MANY(businessId)
        ),
      "Error al buscar tickets"
    );

    return res;
  }
}
