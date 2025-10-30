import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Calendar1Icon } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  group: GroupDetail;
}

export function GroupHeaderSection({ group }: Props) {
  return (
    <View>
      <Card>
        <CardHeader>
          <View className="flex flex-row items-center gap-x-4">
            <CardTitle className="text-2xl">{group.name}</CardTitle>
            {group.isDefault && (
              <Badge variant="outline" className="rounded-full">
                <Text>Por defecto</Text>
              </Badge>
            )}
          </View>
          <CardDescription>
            {group.description ?? "Sin descripción"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
        </CardContent>
        <CardFooter className="flex gap-x-2">
          <Icon as={Calendar1Icon} size={24} />
          <Text>
            Creado{" "}
            {formatDistanceToNow(group.createdAt, {
              locale: es,
              addSuffix: true,
            })}
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
