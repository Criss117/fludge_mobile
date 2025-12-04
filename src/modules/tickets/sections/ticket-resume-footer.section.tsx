import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { formatCurrency } from "@/modules/shared/lib/utils";
import { useMemo } from "react";
import { SaveTicketItemCard } from "../components/save-ticket";
import type { TicketItemStore } from "../store/tickets.store";

interface Props {
  ticketItems: TicketItemStore[];
}

export function TicketResumeFooter({ ticketItems }: Props) {
  const total = useMemo(() => {
    if (!ticketItems) return 0;

    return ticketItems.reduce(
      (acc, item) => acc + item.salePrice * item.quantity,
      0
    );
  }, [ticketItems]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Items: {ticketItems.length}</CardDescription>
        <CardTitle variant="h3">Total: $ {formatCurrency(total)}</CardTitle>
      </CardHeader>
      <CardContent>
        <SaveTicketItemCard items={ticketItems} />
      </CardContent>
    </Card>
  );
}
