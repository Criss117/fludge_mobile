import { TicketResumeScreen } from "@/modules/tickets/screens/ticket-resume.screen";
import { useTicketsStore } from "@/modules/tickets/store/tickets.store";
import { useGlobalSearchParams } from "expo-router";
import { useMemo } from "react";

export default function Resume() {
  const { businessId } = useGlobalSearchParams<{ businessId?: string }>();

  const tickets = useTicketsStore((state) => state.tickets);
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);

  const currentTicket = useMemo(
    () => tickets.get(currentTicketId) ?? [],
    [tickets, currentTicketId]
  );

  if (!businessId) return null;

  return (
    <TicketResumeScreen businessId={businessId} ticketItems={currentTicket} />
  );
}
