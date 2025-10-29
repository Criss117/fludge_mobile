import {
  translatePermission,
  type Permission,
} from "@/shared/entities/permissions";
import { ComponentProps } from "react";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";

interface Props extends Omit<ComponentProps<typeof Badge>, "variant"> {
  permission: Permission;
}

type Variant = ComponentProps<typeof Badge>["variant"];

export function PermissionBadge({ permission, ...props }: Props) {
  const esPermission = translatePermission(permission);

  let variant: Variant = "default";

  switch (esPermission.action) {
    case "create":
      variant = "default";
      break;
    case "read":
      variant = "default";
      break;
    case "update":
      variant = "outline";
      break;
    case "delete":
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} {...props}>
      <Text>{esPermission.es}</Text>
    </Badge>
  );
}
