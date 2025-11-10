import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import type { CategorySummary } from "@/shared/entities/categories.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Calendar } from "lucide-react-native";
import { View } from "react-native";

interface Props {
  category: CategorySummary;
}

export function CategoryCard({ category }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle variant="h4">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <View className="px-6">
        <Separator />
      </View>
      <CardContent>
        <View className="flex flex-row gap-x-1 items-center">
          <Icon as={Calendar} size={20} />
          <Text className="text-muted-foreground">
            Creado{" "}
            {formatDistanceToNow(category.createdAt, {
              addSuffix: true,
              locale: es,
            })}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
