import type { BusinessDetail } from "@/shared/entities/business.entity";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BusinessCardsInfoSection,
  BusinessCardsInfoSectionSkeleton,
} from "../sections/business-cards-info.section";
import {
  BusinessHeaderSection,
  BusinessHeaderSectionSkeleton,
} from "../sections/business-header.section";
import {
  BusinessListsSection,
  BusinessListsSectionSkeleton,
} from "../sections/business-lists.section";
import { BusinessUserRootSection } from "../sections/business-user-root.section";

interface Props {
  business: BusinessDetail;
}

export function BusinessScreen({ business }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: top }}
    >
      <View className="flex gap-y-4 mb-4">
        <BusinessHeaderSection business={business} />
        <BusinessCardsInfoSection business={business} />
        <BusinessListsSection business={business} />
        <BusinessUserRootSection business={business} />
      </View>
    </ScrollView>
  );
}

export function BusinessScreenSkeleton() {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: top }}
    >
      <View className="flex gap-y-4 mb-4">
        <BusinessHeaderSectionSkeleton />
        <BusinessCardsInfoSectionSkeleton />
        <BusinessListsSectionSkeleton />
      </View>
    </ScrollView>
  );
}
