import { usePermissions } from "@/modules/auth/providers/permissions.provider";
import { CreateEmployeeScreen } from "@/modules/employees/screens/create-employee.screen";
import { PermissionsAlert } from "@/modules/shared/components/forbiden-alerts";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CreateEmployee() {
  const { businessSlug } = useLocalSearchParams<{
    businessSlug?: string;
  }>();
  const { hasPermission } = usePermissions();

  if (!businessSlug) return null;

  const userCanCreateEmployee = hasPermission("employees:create");

  if (!userCanCreateEmployee)
    return (
      <View className="flex-1 px-4 mt-5">
        <PermissionsAlert
          descriptions={["No tienes permisos para crear empleados"]}
        />
      </View>
    );

  return <CreateEmployeeScreen businessSlug={businessSlug} />;
}
