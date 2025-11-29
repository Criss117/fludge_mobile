import { ticketsQueriesOptions } from "@/integrations/query/query-container";
import { TicketsScreen } from "@/modules/tickets/screens/tickets.screen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";

interface Props {
  businessId: string;
}

function ScreenSuspence({ businessId }: Props) {
  const { data: tickets } = useSuspenseQuery(
    ticketsQueriesOptions.findMany(businessId)
  );

  return <TicketsScreen businessId={businessId} tickets={tickets} />;
}

export default function Sales() {
  const { businessId } = useGlobalSearchParams<{ businessId?: string }>();

  if (!businessId) return null;

  return (
    <Suspense>
      <ScreenSuspence businessId={businessId} />
    </Suspense>
  );
}
