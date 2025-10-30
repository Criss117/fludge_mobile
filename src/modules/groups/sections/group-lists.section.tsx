import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/shared/components/ui/tabs";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupDetail } from "@/shared/entities/group.entity";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { EmployeesList } from "../components/employees-list";
import { PermissionList } from "../components/permission-list";

interface Props {
  group: GroupDetail;
}

const values = {
  employees: "employees",
  permissions: "permissions",
} as const;
type Values = (typeof values)[keyof typeof values];

export function GroupListsSection({ group }: Props) {
  const [value, setValue] = useState<Values>("employees");

  return (
    <View>
      <Tabs value={value} onValueChange={(v) => setValue(v as Values)}>
        <TabsList className="w-full">
          <TabsTrigger value={values.employees} className="flex-1">
            <Text>Empleados</Text>
          </TabsTrigger>
          <TabsTrigger value={values.permissions} className="flex-1">
            <Text>Permisos</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={values.employees}>
          <Card>
            <CardHeader>
              <CardTitle>Listado de empleados</CardTitle>
              <CardDescription>
                Aquí puedes ver todos los empleados que forman parte de este
                grupo.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-6">
              <ScrollView nestedScrollEnabled>
                <View className="flex gap-y-2">
                  <EmployeesList employees={group.employees} />
                </View>
              </ScrollView>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value={values.permissions}>
          <Card>
            <CardHeader>
              <CardTitle>Listado de permisos</CardTitle>
              <CardDescription>
                Aquí puedes ver todas las permisos que tienes asignados a este
                grupo.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-6 max-h-96">
              <ScrollView nestedScrollEnabled>
                <View className="flex gap-y-2">
                  <PermissionList permissions={group.permissions} />
                </View>
              </ScrollView>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
