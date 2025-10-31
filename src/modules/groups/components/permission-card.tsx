import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import {
  type Permission,
  translatePermission,
} from "@/shared/entities/permissions";
import { TouchableWithoutFeedback, View } from "react-native";

interface Props {
  permission: Permission;
  onPress: (permission: Permission) => void;
  isSelected: boolean;
}

export function PermissionCard({ onPress, permission, isSelected }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(permission)}>
      <Card className={cn(isSelected && "border-primary bg-primary/10")}>
        <CardContent className="flex flex-row gap-x-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onPress(permission)}
            className="size-5 mt-1"
          />
          <View>
            <Text>{translatePermission(permission).es}</Text>
            <Text className="text-sm text-muted-foreground">{permission}</Text>
          </View>
        </CardContent>
      </Card>
    </TouchableWithoutFeedback>
  );
}
