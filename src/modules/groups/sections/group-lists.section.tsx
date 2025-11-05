import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/shared/components/ui/tabs";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { useState } from "react";
import { View } from "react-native";
import { EmployeesTab } from "../components/employees-tab";
import { PermissionsTab } from "../components/permissions-tab";

interface Props {
  group: GroupDetail;
}

const tabs = [
  {
    name: "Empleados",
    Cmp: EmployeesTab,
  },
  {
    name: "Permisos",
    Cmp: PermissionsTab,
  },
] as const;

type Values = (typeof tabs)[number]["name"];
export function GroupListsSection({ group }: Props) {
  const [value, setValue] = useState<Values>("Empleados");

  return (
    <View>
      <Tabs value={value} onValueChange={(v) => setValue(v as Values)}>
        <TabsList className="w-full mb-5">
          {tabs.map(({ name }) => (
            <TabsTrigger value={name} key={name} className="flex-1">
              <Text>{name}</Text>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ name, Cmp }) => (
          <TabsContent value={name} className="flex gap-y-2" key={name}>
            <Cmp group={group} />
          </TabsContent>
        ))}
      </Tabs>
    </View>
  );
}
