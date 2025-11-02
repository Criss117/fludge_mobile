import { PermissionBadge } from "@/modules/shared/components/permission-badge";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { cn, spliText } from "@/modules/shared/lib/utils";
import type { EmployeeDetail } from "@/shared/entities/employee.entity";
import * as Haptics from "expo-haptics";
import { PlusIcon, Trash2Icon } from "lucide-react-native";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

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
          <Button className="rounded-full" size="icon">
            <Icon as={PlusIcon} size={24} />
          </Button>
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
          {employee.groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              onPress={() => onGroupSelected(group.id)}
            >
              <Card
                className={cn(
                  selectedGroupIds.includes(group.id) &&
                    "border-primary bg-primary/10"
                )}
              >
                <CardHeader className="flex items-start flex-row">
                  <Checkbox
                    checked={selectedGroupIds.includes(group.id)}
                    onCheckedChange={() => onGroupSelected(group.id)}
                    className="size-5"
                  />
                  <View>
                    <CardTitle>{spliText(group.name, 25)}</CardTitle>
                    <CardDescription>
                      {group.description ? spliText(group.description, 30) : ""}
                    </CardDescription>
                  </View>
                </CardHeader>
                <CardFooter>
                  <FlatList
                    data={group.permissions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <PermissionBadge permission={item} />
                    )}
                    ItemSeparatorComponent={() => <View className="w-2" />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </CardFooter>
              </Card>
            </TouchableOpacity>
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
