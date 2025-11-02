import { GroupCardWithCheck } from "@/modules/groups/components/group-card-whit-check";
import { Button } from "@/modules/shared/components/ui/button";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import * as Haptics from "expo-haptics";
import { Trash2Icon } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { AssignGroupsDialog } from "../components/assign-groups-dialog";

interface Props {
  employee: EmployeeDetail;
  businessSlug: string;
}

export function AssignedGroupsSection({ employee, businessSlug }: Props) {
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const onGroupSelected = (groupId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (selectedGroupIds.includes(groupId)) {
      setSelectedGroupIds(selectedGroupIds.filter((id) => id !== groupId));
    } else {
      setSelectedGroupIds([...selectedGroupIds, groupId]);
    }
  };

  return (
    <View className="flex gap-y-2">
      <View className="flex flex-row justify-between items-center">
        <Text variant="h4">
          Grupos asignados (
          {selectedGroupIds.length > 0 && `${selectedGroupIds.length}/`}
          {employee.groups.length})
        </Text>
        <View className="flex flex-row gap-x-2">
          <AssignGroupsDialog businessSlug={businessSlug} employee={employee} />
          <Button
            className="rounded-full"
            variant={selectedGroupIds.length === 0 ? "outline" : "destructive"}
            size="icon"
            disabled={selectedGroupIds.length === 0}
          >
            <Icon as={Trash2Icon} />
          </Button>
        </View>
      </View>
      <Card>
        <CardContent className="flex gap-y-2">
          {!employee.groups.length && <Text>No hay grupos asignados</Text>}
          {employee.groups.map((group) => (
            <GroupCardWithCheck
              key={group.id}
              isSelected={selectedGroupIds.includes(group.id)}
              group={group}
              onPress={() => onGroupSelected(group.id)}
            />
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
