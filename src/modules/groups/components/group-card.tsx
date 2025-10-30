import { PermissionBadge } from "@/modules/shared/components/permission-badge";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { useRouter } from "expo-router";
import { MoreVerticalIcon } from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

interface Props {
  group: GroupSummary;
  businessSlug: string;
}

export function GroupCard({ group, businessSlug }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
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
          <View>
            <CardTitle className="text-xl">{group.name}</CardTitle>
            <CardDescription>
              {group.description ?? "Sin descripción"}
            </CardDescription>
          </View>
          <View>
            <Button variant="outline" size="icon" className="rounded-full">
              <Icon as={MoreVerticalIcon} size={24} />
            </Button>
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
