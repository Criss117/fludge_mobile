import type { GroupDetail } from "@/shared/entities/group.entity";
import { RefreshControl, ScrollView, View } from "react-native";
import {
  GroupAditionalInfo,
  GroupAditionalInfoSkeleton,
} from "../sections/group-aditional-info";
import {
  GroupHeaderSection,
  GroupHeaderSectionSkeleton,
} from "../sections/group-header.section";
import {
  GroupListsSection,
  GroupListsSectionSkeleton,
} from "../sections/group-lists.section";

interface Props {
  group: GroupDetail;
  isPending: boolean;
  refetch: () => void;
}

export function GroupScreen({ group, isPending, refetch }: Props) {
  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={refetch} />
      }
    >
      <View className="flex-1 flex gap-y-7 mt-4 mb-10 px-2">
        <GroupHeaderSection group={group} />
        <GroupListsSection group={group} />
        <GroupAditionalInfo group={group} />
      </View>
    </ScrollView>
  );
}

export function GroupScreenSkeleton() {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 flex gap-y-7 mt-4 mb-10 px-2">
        <GroupHeaderSectionSkeleton />
        <GroupListsSectionSkeleton />
        <GroupAditionalInfoSkeleton />
      </View>
    </ScrollView>
  );
}
