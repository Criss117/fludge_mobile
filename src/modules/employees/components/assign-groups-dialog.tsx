import { businessQueriesOptions } from "@/integrations/query/query-container";
import { GroupCardWithCheck } from "@/modules/groups/components/group-card-whit-check";
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
import { EmployeeDetail } from "@/shared/entities/employee.entity";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useMutateEmployees } from "../hooks/use.mutate-employees";

interface Props {
  businessSlug: string;
  employee: EmployeeDetail;
}

export function AssignGroupsDialog({ businessSlug, employee }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );
  const { assignGroups } = useMutateEmployees();
  const [open, setOpen] = useState(false);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const avaliableGroups = useMemo(
    () =>
      business.groups.filter(
        (p) => !employee.groups.some((e) => e.id === p.id)
      ),
    [business.groups, employee.groups]
  );

  const handleGroupSelect = (groupId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    setSelectedGroupIds((prev) => {
      if (prev.includes(groupId)) return prev.filter((p) => p !== groupId);

      return [...prev, groupId];
    });
  };

  const clearState = useCallback(() => {
    setSelectedGroupIds([]);
  }, [setSelectedGroupIds]);

  const handleAddPermissions = () => {
    if (selectedGroupIds.length === 0) return;

    assignGroups.mutate(
      {
        businessSlug,
        employeeId: employee.id,
        data: {
          groupIds: selectedGroupIds,
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
          <DialogTitle>Seleccion de grupos</DialogTitle>
          <DialogDescription>
            Selecciona los grupos que deseas asignar a este empleado.
          </DialogDescription>
        </DialogHeader>
        <FlatList
          className="max-h-96"
          data={avaliableGroups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupCardWithCheck
              isSelected={selectedGroupIds.includes(item.id)}
              group={item}
              onPress={(group) => handleGroupSelect(group.id)}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          <Button
            disabled={selectedGroupIds.length === 0 || assignGroups.isPending}
            onPress={handleAddPermissions}
          >
            {assignGroups.isPending && (
              <ActivityIndicator className="text-white" />
            )}
            {!assignGroups.isPending && (
              <Text>Asignar ({selectedGroupIds.length}) grupos</Text>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
