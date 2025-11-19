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
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
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
      <Card className="relative">
        <CardHeader>
          <View className="flex flex-row items-center gap-x-4">
            <CardTitle className="text-2xl flex-1">{group.name}</CardTitle>
            {group.isDefault && (
              <Badge variant="outline" className="rounded-full flex-shrink-0">
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

export function GroupHeaderSectionSkeleton() {
  return (
    <View>
      <Card className="relative">
        <CardHeader>
          <View className="flex flex-row items-center gap-x-4">
            <CardTitle className="text-2xl flex-1">
              <Skeleton className="w-1/2 h-6 bg-muted-foreground" />
            </CardTitle>
          </View>
          <CardDescription>
            <Skeleton className="w-full h-4 bg-muted-foreground" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
        </CardContent>
        <CardFooter className="flex gap-x-2">
          <Icon as={Calendar1Icon} size={24} />
          <Skeleton className="w-3/4 h-4 bg-muted-foreground" />
        </CardFooter>
      </Card>
    </View>
  );
}
