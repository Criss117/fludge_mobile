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
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { Permission } from "@/shared/entities/permissions";
import * as Haptics from "expo-haptics";
import { Trash2Icon } from "lucide-react-native";
import { createContext, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";
import { PermissionCard } from "./permission-card";

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
  clearState: () => void;
}

const PermissionsListContext = createContext<Context | null>(null);

function usePermissionsList() {
  const context = use(PermissionsListContext);

  if (context === null) {
    throw new Error("usePermissionsList must be used within a Provider");
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

  const clearState = () => {
    setSelectedPermissions([]);
  };

  return (
    <PermissionsListContext.Provider
      value={{
        selectedPermissions,
        handlePermissionSelect,
        clearState,
        permissions,
      }}
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
  const { selectedPermissions, clearState } = usePermissionsList();

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
          clearState();
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button
          variant={selectedPermissions.length === 0 ? "outline" : "destructive"}
          size="icon"
          className="rounded-full"
          disabled={selectedPermissions.length === 0}
        >
          <Icon as={Trash2Icon} size={16} />
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
    usePermissionsList();
  return (
    <>
      {permissions.map((permission) => (
        <PermissionCard
          key={permission}
          permission={permission}
          isSelected={selectedPermissions.includes(permission)}
          onPress={handlePermissionSelect}
        />
      ))}
    </>
  );
}

export const PermissionsList = {
  List,
  Root,
  RemovePermissionsAlert,
  usePermissionsList,
};
