import { businessQueriesOptions } from "@/integrations/query/query-container";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  businessSlug: string;
}

function BusinessHomeSuspense({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  return (
    <ScrollView>
      <Stack.Screen options={{ title: business.name }} />
      <Text>{JSON.stringify(business, null, 2)}</Text>
    </ScrollView>
  );
}

export default function BusinessHome() {
  const { top } = useSafeAreaInsets();
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <View style={{ top: top }}>
      <Suspense fallback={<Text>Cargando...</Text>}>
        <BusinessHomeSuspense businessSlug={businessSlug} />
      </Suspense>
    </View>
  );
}
