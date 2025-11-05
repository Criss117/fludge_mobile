import { businessQueriesOptions } from "@/integrations/query/query-container";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";
import { EmployeeCard } from "./employee-card";

interface Props {
  group: GroupDetail;
}

export function AssignEmployeesDialog({ group }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(group.business.slug)
  );
  const [open, setOpen] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const { assignEmployees } = useMutateGroups();

  const availableEmployees = useMemo(
    () =>
      business.employees.filter(
        (p) => !group.employees.some((e) => e.id === p.id)
      ),
    [group.employees, business.employees]
  );

  const handleEmployeeSelect = (employeeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (selectedEmployeeIds.includes(employeeId)) {
      setSelectedEmployeeIds((prev) => prev.filter((p) => p !== employeeId));
    } else {
      setSelectedEmployeeIds((prev) => [...prev, employeeId]);
    }
  };

  const clearState = useCallback(() => {
    setSelectedEmployeeIds([]);
  }, [setSelectedEmployeeIds]);

  const handleAddPermissions = () => {
    if (selectedEmployeeIds.length === 0) return;

    assignEmployees.mutate(
      {
        businessSlug: group.business.slug,
        groupId: group.id,
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
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon">
          <Icon as={PlusIcon} size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccion de empleados</DialogTitle>
          <DialogDescription>
            Selecciona los empleados que deseas asignar a este grupo.
          </DialogDescription>
        </DialogHeader>
        <FlatList
          className="max-h-96"
          data={availableEmployees}
          renderItem={({ item }) => (
            <EmployeeCard
              employee={item}
              isSelected={selectedEmployeeIds.some((eid) => eid === item.id)}
              onPress={(employee) => handleEmployeeSelect(employee.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={() => <Text>No hay empleados disponibles</Text>}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          {availableEmployees.length > 0 && (
            <Button
              onPress={handleAddPermissions}
              disabled={
                assignEmployees.isPending || selectedEmployeeIds.length === 0
              }
            >
              {assignEmployees.isPending && (
                <ActivityIndicator className="text-white" />
              )}
              {!assignEmployees.isPending && <Text>Agregar</Text>}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
