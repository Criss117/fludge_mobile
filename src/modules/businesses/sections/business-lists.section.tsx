import type { BusinessDetail } from "@/shared/entities/business.entity";
import { View } from "react-native";
import { RecentEmployeesList } from "../components/recent-employees-list";
import { RecentGroupsList } from "../components/recent-groups-list";

interface Props {
  business: BusinessDetail;
}

export function BusinessListsSection({ business }: Props) {
  return (
    <View className="flex gap-y-4">
      <RecentGroupsList
        groups={business.groups.slice(0, 3)}
        businessId={business.id}
      />
      <RecentEmployeesList
        employees={business.employees.slice(0, 3)}
        businessId={business.id}
      />
    </View>
  );
}
