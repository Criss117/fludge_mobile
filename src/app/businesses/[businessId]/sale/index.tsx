import { businessQueriesOptions } from "@/integrations/query/query-container";
import { ProductsScreenSkeleton } from "@/modules/products/screens/products.screen";
import { CreateTicketScreen } from "@/modules/tickets/screens/create-ticket.screen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";

interface Props {
  businessId: string;
}

function SuspenseScreen({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <CreateTicketScreen
      categories={business.categories}
      businessId={businessId}
    />
  );
}

export default function Sale() {
  const { businessId } = useGlobalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <Suspense fallback={<ProductsScreenSkeleton />}>
      <SuspenseScreen businessId={businessId} />
    </Suspense>
  );
}
