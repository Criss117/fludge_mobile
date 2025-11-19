import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { RefreshControl, ScrollView, View } from "react-native";
import {
  AssignedGroupsSection,
  AssignedGroupsSectionSkeleton,
} from "../sections/assigned-groups.section";
import {
  EmployeeHeaderSection,
  EmployeeHeaderSectionSkeleton,
} from "../sections/employee-header.section";
import {
  EmployeeSystemInformationSection,
  EmployeeSystemInformationSectionSkeleton,
} from "../sections/employee-system-information.section";
import {
  LaboralInformationSection,
  LaboralInformationSectionSkeleton,
} from "../sections/laboral-information.section";

interface Props {
  employee: EmployeeDetail;
  businessId: string;
  isPending: boolean;
  refetch: () => void;
}

export function EmployeeScreen({
  employee,
  isPending,
  refetch,
  businessId,
}: Props) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={refetch} />
      }
    >
      <View className="flex-1 gap-y-7 px-2 pt-4 pb-8">
        <EmployeeHeaderSection employee={employee} />
        <LaboralInformationSection employee={employee} />
        <AssignedGroupsSection employee={employee} businessId={businessId} />
        <EmployeeSystemInformationSection employee={employee} />
      </View>
    </ScrollView>
  );
}

export function EmployeeScreenSkeleton() {
  return (
    <ScrollView>
      <View className="flex-1 gap-y-7 px-2 pt-4 pb-8">
        <EmployeeHeaderSectionSkeleton />
        <LaboralInformationSectionSkeleton />
        <AssignedGroupsSectionSkeleton />
        <EmployeeSystemInformationSectionSkeleton />
      </View>
    </ScrollView>
  );
}
