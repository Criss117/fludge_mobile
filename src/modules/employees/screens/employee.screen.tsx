import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { RefreshControl, ScrollView, View } from "react-native";
import { AssignedGroupsSection } from "../sections/assigned-groups.section";
import { EmployeeHeaderSection } from "../sections/employee-header.section";
import { EmployeeSystemInformationSection } from "../sections/employee-system-information.section";
import { LaboralInformationSection } from "../sections/laboral-information.section";

interface Props {
  employee: EmployeeDetail;
  businessSlug: string;
  isPending: boolean;
  refetch: () => void;
}

export function EmployeeScreen({
  employee,
  isPending,
  refetch,
  businessSlug,
}: Props) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={refetch} />
      }
    >
      <View className="flex-1 gap-y-7 px-4 pt-4 pb-8">
        <EmployeeHeaderSection employee={employee} />
        <LaboralInformationSection employee={employee} />
        <AssignedGroupsSection
          employee={employee}
          businessSlug={businessSlug}
        />
        <EmployeeSystemInformationSection employee={employee} />
      </View>
    </ScrollView>
  );
}
