import { PermissionBadge } from "@/modules/shared/components/permission-badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
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
        <CardHeader className="flex items-start flex-row">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onPress(group)}
            className="size-5"
          />
          <View>
            <CardTitle>{spliText(group.name, 25)}</CardTitle>
            <CardDescription>
              {group.description ? spliText(group.description, 30) : ""}
            </CardDescription>
          </View>
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
