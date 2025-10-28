import type { BusinessDetail } from "@/shared/entities/business.entity";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusinessCardsInfoSection } from "../sections/business-cards-info.section";
import { BusinessHeaderSection } from "../sections/business-header.section";

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
      <View className="flex gap-y-4">
        <BusinessHeaderSection business={business} />
        <BusinessCardsInfoSection business={business} />
      </View>
    </ScrollView>
  );
}
