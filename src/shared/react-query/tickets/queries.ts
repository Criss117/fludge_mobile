import { TicketsActions } from "@/shared/api-utils/actions/tickets.actions";
import { queryOptions } from "@tanstack/react-query";

export class TicketsQueriesOptions {
  constructor(public readonly ticketsActions: TicketsActions) {}

  public findMany(businessId: string) {
    return queryOptions({
      queryKey: ["businesses", businessId, "tickets"],
      queryFn: async () => {
        const res = await this.ticketsActions.findMany(businessId);

        if (res.error || !res.data) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res.data;
      },
    });
  }
}
