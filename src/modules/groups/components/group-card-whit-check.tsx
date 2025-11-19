import { PermissionBadge } from "@/modules/shared/components/permission-badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
import { cn, spliText } from "@/modules/shared/lib/utils";
import { GroupSummary } from "@/shared/entities/group.entity";
import { FlatList, TouchableOpacity, View } from "react-native";
interface Props {
  isSelected: boolean;
  group: GroupSummary;
  onPress: (group: GroupSummary) => void;
}

export function GroupCardWithCheck({ isSelected, group, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(group)} activeOpacity={0.6}>
      <Card className={cn(isSelected && "border-primary bg-primary/10")}>
        <CardHeader className="flex items-center flex-row justify-between">
          <View>
            <CardTitle>{spliText(group.name, 25)}</CardTitle>
            <CardDescription>
              {group.description ? spliText(group.description, 30) : ""}
            </CardDescription>
          </View>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onPress(group)}
            className="size-5"
          />
        </CardHeader>

        <CardFooter>
          <FlatList
            data={group.permissions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <PermissionBadge permission={item} />}
            ItemSeparatorComponent={() => <View className="w-2" />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </CardFooter>
      </Card>
    </TouchableOpacity>
  );
}

export function GroupCardWithCheckSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center flex-row justify-between">
        <View className="flex gap-y-1">
          <CardTitle>
            <Skeleton className="h-4 w-32 rounded-md bg-muted-foreground" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-48 rounded-md bg-muted-foreground" />
          </CardDescription>
        </View>
        <Checkbox
          checked={false}
          onCheckedChange={() => {}}
          disabled
          className="size-5"
        />
      </CardHeader>

      <CardFooter>
        <FlatList
          data={Array.from({ length: 3 })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => (
            <Skeleton className="h-6 w-20 rounded-md bg-muted-foreground" />
          )}
          ItemSeparatorComponent={() => <View className="w-2" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </CardFooter>
    </Card>
  );
}
