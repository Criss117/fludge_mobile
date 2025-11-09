import type { GroupDetail } from "@/shared/entities/group.entity";
import { RefreshControl, ScrollView, View } from "react-native";
import { GroupAditionalInfo } from "../sections/group-aditional-info";
import { GroupHeaderSection } from "../sections/group-header.section";
import { GroupListsSection } from "../sections/group-lists.section";

interface Props {
  group: GroupDetail;
  refetch: () => void;
  isPending: boolean;
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
