import { businessQueriesOptions } from "@/integrations/query/query-container";
import { BusinessScreen } from "@/modules/businesses/screens/business.screen";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  businessSlug: string;
}

function BusinessHomeSuspense({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return <BusinessScreen business={business} />;
}

export default function BusinessHome() {
  const { top } = useSafeAreaInsets();
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <View style={{ top: top, paddingHorizontal: 8 }}>
      <Suspense fallback={<Text>Cargando...</Text>}>
        <BusinessHomeSuspense businessSlug={businessSlug} />
      </Suspense>
    </View>
  );
}
