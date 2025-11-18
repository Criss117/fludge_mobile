import { GroupCardWithCheck } from "@/modules/groups/components/group-card-whit-check";
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
import { GroupSummary } from "@/shared/entities/group.entity";
import * as Haptics from "expo-haptics";
import { Trash2Icon } from "lucide-react-native";
import { createContext, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutateEmployees } from "../hooks/use.mutate-employees";

interface RootProps {
  groups: GroupSummary[];
  children: React.ReactNode;
}

interface RemoveGroupsAlertProps {
  businessId: string;
  employeeId: string;
}

interface Context {
  selectedGroupsIds: string[];
  groups: GroupSummary[];
  onSelectGroup: (groupId: string) => void;
  clearState: () => void;
}

const GroupsListContext = createContext<Context | null>(null);

function useGroupsListContext() {
  const context = use(GroupsListContext);

  if (context === null) {
    throw new Error("useGroupsListContext must be used within a Provider");
  }

  return context;
}

function Root({ children, groups }: RootProps) {
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const onSelectGroup = (groupId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (selectedGroupIds.includes(groupId)) {
      setSelectedGroupIds(selectedGroupIds.filter((id) => id !== groupId));
    } else {
      setSelectedGroupIds([...selectedGroupIds, groupId]);
    }
  };

  const clearState = () => {
    setSelectedGroupIds([]);
  };

  return (
    <GroupsListContext.Provider
      value={{
        selectedGroupsIds: selectedGroupIds,
        groups,
        onSelectGroup,
        clearState,
      }}
    >
      {children}
    </GroupsListContext.Provider>
  );
}

function List() {
  const { onSelectGroup, groups, selectedGroupsIds } = useGroupsListContext();
  return (
    <>
      {groups.length === 0 && <Text>No hay grupos asignados</Text>}
      {groups.map((group) => (
        <GroupCardWithCheck
          key={group.id}
          isSelected={selectedGroupsIds.includes(group.id)}
          group={group}
          onPress={() => onSelectGroup(group.id)}
        />
      ))}
    </>
  );
}

function RemoveGroupsAlert({ businessId, employeeId }: RemoveGroupsAlertProps) {
  const [open, setOpen] = useState(false);
  const { removeGroups } = useMutateEmployees();
  const { selectedGroupsIds, clearState } = useGroupsListContext();

  const handleRemovePermissions = () => {
    if (selectedGroupsIds.length === 0) return;

    removeGroups.mutate(
      {
        businessId,
        employeeId,
        data: {
          groupIds: selectedGroupsIds,
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
          className="rounded-full"
          variant={selectedGroupsIds.length === 0 ? "outline" : "destructive"}
          size="icon"
          disabled={selectedGroupsIds.length === 0}
        >
          <Icon as={Trash2Icon} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro que desea eliminar estos grupos del empleado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            El empleado perderá los permisos asignados a estos grupos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={handleRemovePermissions}
            disabled={removeGroups.isPending}
          >
            {removeGroups.isPending && (
              <ActivityIndicator className="text-white" />
            )}
            {!removeGroups.isPending && <Text>Continuar</Text>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const GroupsList = {
  List,
  Root,
  RemoveGroupsAlert,
  useGroupsListContext,
};
