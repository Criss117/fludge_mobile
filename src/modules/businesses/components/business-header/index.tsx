import { businessQueriesOptions } from "@/integrations/query/query-container";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusinessesMenu } from "./businesses-menu";
import { UserButton } from "./user-button";

export function BusinessHeader({ options }: BottomTabHeaderProps) {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ top: top }}
      className="flex flex-row items-center justify-between pr-4"
    >
      <BusinessesMenu currentBusiness={business} />
      <UserButton />
    </View>
  );
}
