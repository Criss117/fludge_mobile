import { productsQueriesOptions } from "@/integrations/query/query-container";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Suspense } from "react";
import { FlatList, View } from "react-native";

interface Props {
  businessSlug: string;
}

function SuspenseProducts({ businessSlug }: Props) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    productsQueriesOptions.findMany({
      businessSlug,
      params: {
        limit: 50,
      },
    })
  );

  const items = data.pages.flatMap((page) => page.items);

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
          </Card>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListFooterComponent={
          <Button onPress={() => fetchNextPage()} disabled={!hasNextPage}>
            <Text>Cargar más</Text>
          </Button>
        }
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default function Products() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug?: string;
  }>();

  if (!businessSlug) return null;

  return (
    <Suspense fallback={<Text>Loading products...</Text>}>
      <SuspenseProducts businessSlug={businessSlug} />
    </Suspense>
  );
}
