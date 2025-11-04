import { EmployeeForm } from "@/modules/employees/components/employee-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { useGlobalSearchParams } from "expo-router";
import { DollarSign, LockKeyhole, User2Icon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CreateEmployee() {
  const { businessSlug } = useGlobalSearchParams<{
    businessSlug: string;
  }>();

  return (
    <KeyboardAwareScrollView>
      <View className="px-4 flex gap-y-4 pt-4 pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Registrar Empleado</CardTitle>
            <CardDescription>
              Completa la información del nuevo empleado
            </CardDescription>
          </CardHeader>
        </Card>
        <EmployeeForm.Root businessSlug={businessSlug}>
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <View className="bg-primary/10 p-1 rounded-md">
                <Icon as={User2Icon} size={20} />
              </View>
              <CardTitle>Informacíon Personal</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <EmployeeForm.FirstName />
              <EmployeeForm.LastName />
              <EmployeeForm.Phone />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <View className="bg-primary/10 p-1 rounded-md">
                <Icon as={LockKeyhole} size={20} />
              </View>
              <CardTitle>Credenciales de Acceso</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <EmployeeForm.Username />
              <EmployeeForm.Password />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <View className="bg-primary/10 p-1 rounded-md">
                <Icon as={DollarSign} size={20} />
              </View>
              <CardTitle>Información Laboral</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <EmployeeForm.Salary />
            </CardContent>
          </Card>
          <EmployeeForm.Submit />
        </EmployeeForm.Root>
      </View>
    </KeyboardAwareScrollView>
  );
}
