import { TicketsActions } from "@/shared/api-utils/actions/tickets.actions";
import { mutationOptions } from "@tanstack/react-query";

type CreateParams = Parameters<TicketsActions["create"]>[0];

export class TicketsMutationsOptions {
  constructor(public readonly ticketsActions: TicketsActions) {}

  public create() {
    return mutationOptions({
      mutationFn: async (data: CreateParams) => {
        const res = await this.ticketsActions.create(data);

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res.data;
      },
    });
  }
}
