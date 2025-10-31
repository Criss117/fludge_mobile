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
import { Text } from "@/modules/shared/components/ui/text";
import { EmployeeSummary } from "@/shared/entities/employee.entity";
import * as Haptics from "expo-haptics";
import { createContext, use, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";
import { EmployeeCard } from "./employee-card";

interface Props {
  employees: EmployeeSummary[];
}

interface RootProps {
  employees: EmployeeSummary[];
  children: React.ReactNode;
}

interface RemoveEmployeesAlertProps {
  businessSlug: string;
  groupId: string;
}

interface Context {
  selectedEmployeeIds: string[];
  employees: EmployeeSummary[];
  handleEmployeeSelect: (employeeId: string) => void;
  clearState: () => void;
}

const EmployeesListContext = createContext<Context | null>(null);

function useEmployeesListContext() {
  const context = use(EmployeesListContext);

  if (context === null) {
    throw new Error("useEmployeesListContext must be used within a Provider");
  }

  return context;
}

function Root({ children, employees }: RootProps) {
  const [selectedEmployeeIds, setSelectedEmployees] = useState<string[]>([]);

  const handleEmployeeSelect = (employeeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (selectedEmployeeIds.includes(employeeId)) {
      setSelectedEmployees((prev) => prev.filter((p) => p !== employeeId));
    } else {
      setSelectedEmployees((prev) => [...prev, employeeId]);
    }
  };

  const clearState = () => {
    setSelectedEmployees([]);
  };

  return (
    <EmployeesListContext.Provider
      value={{
        selectedEmployeeIds,
        employees,
        handleEmployeeSelect,
        clearState,
      }}
    >
      {children}
    </EmployeesListContext.Provider>
  );
}

function RemoveEmployeesAlert({
  businessSlug,
  groupId,
}: RemoveEmployeesAlertProps) {
  const [open, setOpen] = useState(false);
  const { removeEmployees } = useMutateGroups();
  const { selectedEmployeeIds, clearState } = useEmployeesListContext();

  const handleRemovePermissions = () => {
    if (selectedEmployeeIds.length === 0) return;

    removeEmployees.mutate(
      {
        businessSlug,
        groupId,
        values: {
          employeeIds: selectedEmployeeIds,
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
          variant="destructive"
          disabled={selectedEmployeeIds.length === 0}
        >
          <Text>Eliminar {selectedEmployeeIds.length} empleados</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro de que desea eliminar estos empleados del grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Los empleados que elimines perderan los permisos asignados
            pertenecientes a este grupo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancelar</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={handleRemovePermissions}
            disabled={removeEmployees.isPending}
          >
            {removeEmployees.isPending && (
              <ActivityIndicator className="text-white" />
            )}
            {!removeEmployees.isPending && <Text>Continuar</Text>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function List() {
  const { handleEmployeeSelect, employees, selectedEmployeeIds } =
    useEmployeesListContext();
  return (
    <>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isSelected={selectedEmployeeIds.includes(employee.id)}
          onPress={(employee) => handleEmployeeSelect(employee.id)}
        />
      ))}
    </>
  );
}

export const EmployeesList = {
  List,
  Root,
  RemoveEmployeesAlert,
  useEmployeesListContext,
};
