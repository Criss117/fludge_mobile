import { businessQueriesOptions } from "@/integrations/query/query-container";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusinessesMenu } from "./businesses-menu";
import { UserButton } from "./user-button";

interface Props {
  bottomTabHeaderProps: BottomTabHeaderProps;
  businessId: string;
}

export function BusinessHeader({ businessId, bottomTabHeaderProps }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
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
