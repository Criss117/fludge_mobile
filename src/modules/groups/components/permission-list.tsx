import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import { Permission, translatePermission } from "@/shared/entities/permissions";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  permissions: Permission[];
}

export function PermissionList({ permissions }: Props) {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const handlePermissionSelect = (permission: Permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    } else {
      setSelectedPermissions((prev) => [...prev, permission]);
    }
  };

  return (
    <>
      {permissions.map((permission) => (
        <TouchableOpacity
          key={permission}
          onPress={() => handlePermissionSelect(permission)}
        >
          <Card
            className={cn(
              selectedPermissions.includes(permission) && "bg-primary"
            )}
          >
            <CardContent>
              <Text>{translatePermission(permission).es}</Text>
              <Text className="text-sm text-muted-foreground">
                {permission}
              </Text>
            </CardContent>
          </Card>
        </TouchableOpacity>
      ))}
    </>
  );
}
