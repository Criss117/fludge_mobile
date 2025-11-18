import { Button } from "@/modules/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/ui/dialog";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { allPermission, type Permission } from "@/shared/entities/permissions";
import * as Haptics from "expo-haptics";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";
import { PermissionCard } from "./permission-card";

interface Props {
  group: GroupDetail;
}
export function AddPermissionsDialog({ group }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const { addPermissions } = useMutateGroups();
  const availablePermissions = useMemo(
    () => allPermission.filter((p) => !group.permissions.includes(p)),
    [group.permissions]
  );

  const handlePermissionSelect = (permission: Permission) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    } else {
      setSelectedPermissions((prev) => [...prev, permission]);
    }
  };

  const clearState = useCallback(() => {
    setSelectedPermissions([]);
  }, [setSelectedPermissions]);

  const handleAddPermissions = () => {
    if (selectedPermissions.length === 0) return;

    addPermissions.mutate(
      {
        businessId: group.business.id,
        groupId: group.id,
        values: {
          permissions: selectedPermissions,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          clearState();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon">
          <Icon as={PlusIcon} size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccion de permisos</DialogTitle>
          <DialogDescription>
            Selecciona los permisos que deseas asignar a este grupo.
          </DialogDescription>
        </DialogHeader>
        <FlatList
          className="max-h-96"
          data={availablePermissions}
          renderItem={({ item }) => (
            <PermissionCard
              permission={item}
              isSelected={selectedPermissions.includes(item)}
              onPress={handlePermissionSelect}
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={() => <Text>No hay permisos disponibles</Text>}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          {availablePermissions.length > 0 && (
            <Button
              onPress={handleAddPermissions}
              disabled={
                addPermissions.isPending || selectedPermissions.length === 0
              }
            >
              {addPermissions.isPending && (
                <ActivityIndicator className="text-white" />
              )}
              {!addPermissions.isPending && <Text>Agregar</Text>}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
