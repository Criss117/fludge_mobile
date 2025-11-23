import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
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

export function RecentGroupsListSkeleton() {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Grupos recientes</Text>
      <Card>
        <CardContent className="flex gap-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card className="flex flex-row justify-between" key={index}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-full rounded-lg bg-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
