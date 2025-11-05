import { Badge } from "@/modules/shared/components/ui/badge";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { View } from "react-native";

interface Props {
  group: GroupDetail;
}

export function GroupAditionalInfo({ group }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Información adicional</Text>
      <Card>
        <CardContent className="flex gap-y-2">
          <View>
            <Text className="text-sm text-muted-foreground">ID del grupo</Text>
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
  );
}
