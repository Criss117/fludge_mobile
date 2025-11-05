import { PermissionBadge } from "@/modules/shared/components/permission-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Separator } from "@/modules/shared/components/ui/separator";
import { spliText } from "@/modules/shared/lib/utils";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { GroupActions } from "./group-actions";

interface Props {
  group: GroupSummary;
  businessSlug: string;
}

export function GroupCard({ group, businessSlug }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        router.push({
          pathname: "/businesses/[businessSlug]/groups/[groupId]",
          params: {
            businessSlug,
            groupId: group.id,
          },
        })
      }
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <View className="flex flex-1">
            <CardTitle className="text-xl">
              {spliText(group.name, 25)}
            </CardTitle>
            <CardDescription>
              {group.description
                ? spliText(group.description, 35)
                : "Sin descripción"}
            </CardDescription>
          </View>
          {/* TODO: Implement this */}
          <View className="flex-shrink-0">
            <GroupActions group={group} businessSlug={businessSlug} />
          </View>
        </CardHeader>
        <Separator />
        <CardContent>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={group.permissions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <PermissionBadge permission={item} />}
            ItemSeparatorComponent={() => <View className="w-2" />}
          />
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
