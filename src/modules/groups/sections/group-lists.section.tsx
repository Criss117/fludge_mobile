import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
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
        <TabsList className="w-full mb-3">
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

export function GroupListsSectionSkeleton() {
  return (
    <View>
      <Tabs value="employees" onValueChange={() => {}}>
        <TabsList className="w-full mb-3">
          <TabsTrigger value="employees" className="flex-1" disabled>
            <Text>Empleados</Text>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex-1" disabled>
            <Text>Grupos</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <Card>
            <CardContent className="flex gap-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-14 bg-muted-foreground" />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
