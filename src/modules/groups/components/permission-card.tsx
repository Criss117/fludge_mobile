import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { translatePermission } from "@/modules/shared/lib/translate-permissions";
import { cn } from "@/modules/shared/lib/utils";
import type { Permission } from "@/shared/entities/permissions";
import { TouchableWithoutFeedback } from "react-native";

interface Props {
  permission: Permission;
  isSelected: boolean;
  onPress: (permission: Permission) => void;
}

export function PermissionCard({ onPress, permission, isSelected }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(permission)}>
      <Card
        className={cn(
          "py-3 flex flex-row justify-between items-center",
          isSelected && "border-primary bg-primary/10"
        )}
      >
        <CardHeader className="px-4">
          <CardTitle>{translatePermission(permission).es}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {permission}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-x-2 px-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onPress(permission)}
            className="size-5"
          />
        </CardContent>
      </Card>
    </TouchableWithoutFeedback>
  );
}
