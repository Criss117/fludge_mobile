import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/shared/components/ui/alert-dialog";
import { Button } from "@/modules/shared/components/ui/button";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import { Permission, translatePermission } from "@/shared/entities/permissions";
import * as Haptics from "expo-haptics";
import { createContext, use, useState } from "react";
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";

interface RootProps {
  permissions: Permission[];
  children: React.ReactNode;
}

interface RemovePermissionsAlertProps {
  businessSlug: string;
  groupId: string;
}

interface Context {
  selectedPermissions: Permission[];
  permissions: Permission[];
  handlePermissionSelect: (permission: Permission) => void;
}

const PermissionsListContext = createContext<Context | null>(null);

function usePermissionsListContext() {
  const context = use(PermissionsListContext);

  if (context === null) {
    throw new Error("usePermissionsListContext must be used within a Provider");
  }

  return context;
}

function Root({ children, permissions }: RootProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const handlePermissionSelect = (permission: Permission) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    } else {
      setSelectedPermissions((prev) => [...prev, permission]);
    }
  };

  return (
    <PermissionsListContext.Provider
      value={{ selectedPermissions, handlePermissionSelect, permissions }}
    >
      {children}
    </PermissionsListContext.Provider>
  );
}

function RemovePermissionsAlert({
  businessSlug,
  groupId,
}: RemovePermissionsAlertProps) {
  const [open, setOpen] = useState(false);
  const { removePermissions } = useMutateGroups();
  const { selectedPermissions } = usePermissionsListContext();

  const handleRemovePermissions = () => {
    if (selectedPermissions.length === 0) return;

    removePermissions.mutate(
      {
        businessSlug,
        groupId,
        values: {
          permissions: selectedPermissions,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={selectedPermissions.length === 0}
        >
          <Text>Eliminar {selectedPermissions.length} permisos</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro de que desea eliminar estos permisos?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Los empleados que pertenezcan a este grupo perderan los permisos que
            seleccionaste.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={handleRemovePermissions}
            disabled={removePermissions.isPending}
          >
            {removePermissions.isPending && (
              <ActivityIndicator className="text-white" />
            )}
            {!removePermissions.isPending && <Text>Continuar</Text>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function List() {
  const { handlePermissionSelect, permissions, selectedPermissions } =
    usePermissionsListContext();
  return (
    <>
      {permissions.map((permission) => (
        <TouchableWithoutFeedback
          key={permission}
          onPress={() => handlePermissionSelect(permission)}
        >
          <Card
            className={cn(
              selectedPermissions.includes(permission) &&
                "border-primary bg-primary/10"
            )}
          >
            <CardContent className="flex flex-row gap-x-2">
              <Checkbox
                checked={selectedPermissions.includes(permission)}
                onCheckedChange={() => handlePermissionSelect(permission)}
                className="size-5 mt-1"
              />
              <View>
                <Text>{translatePermission(permission).es}</Text>
                <Text className="text-sm text-muted-foreground">
                  {permission}
                </Text>
              </View>
            </CardContent>
          </Card>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
}

export const PermissionsList = {
  List,
  Root,
  RemovePermissionsAlert,
  usePermissionsListContext,
};
