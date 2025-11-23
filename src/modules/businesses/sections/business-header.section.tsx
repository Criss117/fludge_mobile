import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { Building2 } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  business: BusinessDetail;
}

export function BusinessHeaderSection({ business }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-x-2">
        <View className="bg-primary p-2 rounded-lg">
          <Icon as={Building2} size={32} className="text-white" />
        </View>
        <View className="flex-1">
          <CardTitle variant="h3">{business.name}</CardTitle>
          <CardDescription className={cn(!business.legalName && "italic")}>
            {business.legalName ?? "Sin nombre legal"}
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent className="flex gap-y-2">
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground">NIT</Text>
          <Text>{business.nit}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground">Email</Text>
          <Text>{business.email ?? "-"}</Text>
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Teléfono</Text>
          <Text>{business.phone ?? "-"}</Text>
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Dirección</Text>
          <Text>{business.address ?? "-"}</Text>
        </View>
      </CardContent>
    </Card>
  );
}

export function BusinessHeaderSectionSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-x-2">
        <View className="bg-primary p-2 rounded-lg">
          <Icon as={Building2} size={32} className="text-white" />
        </View>
        <View className="flex-1 flex gap-y-2">
          <CardTitle variant="h3">
            <Skeleton className="h-5 w-full rounded-lg bg-muted-foreground" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent className="flex gap-y-2">
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground">NIT</Text>
          <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
        </View>
        <View className="flex-1">
          <Text className="text-sm text-muted-foreground">Email</Text>
          <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Teléfono</Text>
          <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Dirección</Text>
          <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
        </View>
      </CardContent>
    </Card>
  );
}
