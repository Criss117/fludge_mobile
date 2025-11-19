import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Check, Clock } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  group: GroupDetail;
}

export function GroupAditionalInfo({ group }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Información del sistema</Text>
      <Card>
        <CardContent className="flex gap-y-2">
          <View className="flex flex-row items-start gap-x-2">
            <View className="p-2 bg-primary/10 rounded-md">
              <Icon as={Clock} size={24} />
            </View>
            <View>
              <Text variant="muted" className="text-muted-foreground">
                Creado
              </Text>
              <Text>
                {formatDistanceToNow(group.createdAt, {
                  addSuffix: true,
                  locale: es,
                })}
              </Text>
            </View>
          </View>
          <Separator />
          <View className="flex flex-row items-start gap-x-2">
            <View className="p-2 bg-primary/10 rounded-md">
              <Icon as={Clock} size={24} />
            </View>
            <View>
              <Text variant="muted" className="text-muted-foreground">
                Última actualización
              </Text>
              <Text>
                {formatDistanceToNow(group.updatedAt, {
                  addSuffix: true,
                  locale: es,
                })}
              </Text>
            </View>
          </View>
          <Separator />
          <View className="flex flex-row items-start gap-x-2">
            <View className="p-2 bg-primary/10 rounded-md">
              <Icon as={Check} size={24} />
            </View>
            <View>
              <Text variant="muted" className="text-muted-foreground">
                Estado
              </Text>
              <Text>{group.isActive ? "Activo" : "Inactivo"}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
