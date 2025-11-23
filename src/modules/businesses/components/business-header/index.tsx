import { businessQueriesOptions } from "@/integrations/query/query-container";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusinessesMenu, BusinessesMenuSkeleton } from "./businesses-menu";
import { UserButton } from "./user-button";

interface Props {
  bottomTabHeaderProps: BottomTabHeaderProps;
  businessId: string;
}

function BusinessHeaderSuspense({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  return (
    <>
      <BusinessesMenu currentBusiness={business} />
      <UserButton />
    </>
  );
}

export function BusinessHeader({ businessId, bottomTabHeaderProps }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ top: top }}
      className="flex flex-row items-center justify-between pr-4"
    >
      <Suspense fallback={<BusinessesMenuSkeleton />}>
        <BusinessHeaderSuspense
          businessId={businessId}
          bottomTabHeaderProps={bottomTabHeaderProps}
        />
      </Suspense>
    </View>
  );
}
