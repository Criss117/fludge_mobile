import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupSummary } from "@/shared/entities/group.entity";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

interface Props {
  groups: GroupSummary[];
  businessId: string;
}

export function RecentGroupsList({ groups, businessId }: Props) {
  const router = useRouter();

  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Grupos recientes</Text>
      <Card>
        <CardContent className="flex gap-y-2">
          {groups.map((group) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={group.id}
              onPress={() =>
                router.push({
                  pathname: "/businesses/[businessId]/groups/[groupId]",
                  params: {
                    businessId,
                    groupId: group.id,
                  },
                })
              }
            >
              <Card className="flex flex-row justify-between">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>
                    {group.permissions.length} Permisos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {group.isDefault && (
                    <Badge>
                      <Text>Por defecto</Text>
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
