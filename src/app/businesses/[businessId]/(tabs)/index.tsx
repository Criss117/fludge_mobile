import { businessQueriesOptions } from "@/integrations/query/query-container";
import {
  BusinessScreen,
  BusinessScreenSkeleton,
} from "@/modules/businesses/screens/business.screen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  businessId: string;
}

function BusinessHomeSuspense({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return <BusinessScreen business={business} />;
}

export default function BusinessHome() {
  const { top } = useSafeAreaInsets();
  const { businessId } = useLocalSearchParams<{
    businessId?: string;
  }>();

  if (!businessId) return null;

  return (
    <View style={{ top: top, paddingHorizontal: 8 }}>
      <Suspense fallback={<BusinessScreenSkeleton />}>
        <BusinessHomeSuspense businessId={businessId} />
      </Suspense>
    </View>
  );
}
