import { businessQueriesOptions } from "@/integrations/query/query-container";
import { SearchInput } from "@/modules/shared/components/search-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { translatePermission } from "@/modules/shared/lib/translate-permissions";
import { allPermission } from "@/shared/entities/permissions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileText, ShieldCheck } from "lucide-react-native";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateGroupForm } from "../components/create-group-form";

interface Props {
  businessId: string;
}

function PermissionsList() {
  "use no memo";
  const { form } = CreateGroupForm.useCreateGroupForm();
  const [searchTerm, setSearchTerm] = useState("");

  const permissionsSelected = form.watch("permissions") ?? [];
  const translatedPermissions = useMemo(
    () =>
      new Map<string, string>(
        allPermission.map((permission) => [
          permission,
          translatePermission(permission).es,
        ])
      ),
    []
  );

  const filteresPermissions = allPermission.filter((permission) => {
    const translated = translatedPermissions.get(permission) ?? "";
    return (
      permission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translated.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permissionsSelected.includes(permission)
    );
  });

  return (
    <Card>
      <CardHeader>
        <View className="flex flex-row gap-x-2 items-center">
          <View className="bg-primary/10 p-1 rounded-md">
            <Icon as={ShieldCheck} size={20} />
          </View>
          <CardTitle>Selección de permisos {searchTerm.length}</CardTitle>
        </View>
        <CardDescription>
          Selecciona los permisos que deseas asignar a este grupo.
        </CardDescription>
        <CardDescription>
          {permissionsSelected.length} permisos seleccionados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SearchInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Filtrar permisos"
        />
        <CreateGroupForm.Permissions permissions={filteresPermissions} />
      </CardContent>
    </Card>
  );
}

export function CreateGroupScreen({ businessId }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessId)
  );

  const businessHasDefaultGroup = business?.groups.some(
    (group) => group.isDefault
  );

  return (
    <KeyboardAwareScrollView className="px-2">
      <View className="px-2 flex gap-y-4 pt-4 pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Registrar un Grupo</CardTitle>
            <CardDescription>
              Completa la información del nuevo grupo
            </CardDescription>
          </CardHeader>
        </Card>
        <CreateGroupForm.Root businessId={businessId}>
          <Card>
            <CardHeader className="flex flex-row gap-x-2 items-center">
              <View className="bg-primary/10 p-1 rounded-md">
                <Icon as={FileText} size={20} />
              </View>
              <CardTitle>Informacíon General</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <CreateGroupForm.Name />
              <CreateGroupForm.Description />
            </CardContent>
          </Card>
          <Card>
            {businessHasDefaultGroup && (
              <CardHeader>
                <CardDescription className="text-destructive">
                  El negocio ya tiene un grupo por defecto
                </CardDescription>
              </CardHeader>
            )}
            <CardContent>
              <CreateGroupForm.IsDefault
                hitSlop={{
                  bottom: 60,
                  top: 10,
                  left: 500,
                  right: 100,
                }}
                disabled={businessHasDefaultGroup}
              />
            </CardContent>
          </Card>
          <PermissionsList />
          <CreateGroupForm.Submit />
        </CreateGroupForm.Root>
      </View>
    </KeyboardAwareScrollView>
  );
}
