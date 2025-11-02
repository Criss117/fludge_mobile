import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Check, Clock } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  employee: EmployeeDetail;
}

export function EmployeeSystemInformationSection({ employee }: Props) {
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
                {formatDistanceToNow(employee.createdAt, {
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
                {formatDistanceToNow(employee.updatedAt, {
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
              <Text>{employee.isActive ? "Activo" : "Inactivo"}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
