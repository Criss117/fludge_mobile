import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { RefreshControl, ScrollView, View } from "react-native";
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
      <View className="flex-1 flex gap-y-4 mt-4 mb-10 px-4">
        <GroupHeaderSection group={group} />
        <GroupListsSection group={group} />
        <Card>
          <CardHeader>
            <CardTitle>Información adicional</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-y-2">
            <View>
              <Text className="text-sm text-muted-foreground">
                ID del grupo
              </Text>
              <Text>{group.id}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="text-sm text-muted-foreground">
                  Última actualización
                </Text>
                <Text>
                  {formatDistanceToNow(group.updatedAt, {
                    locale: es,
                    addSuffix: true,
                  })}
                </Text>
              </View>
              <View>
                <Text className="text-sm text-muted-foreground">Estado</Text>
                {group.isActive ? (
                  <Badge>
                    <Text>Activo</Text>
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Text>Inactivo</Text>
                  </Badge>
                )}
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
