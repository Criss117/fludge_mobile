import { businessQueriesOptions } from "@/integrations/query/query-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { FieldSet } from "@/modules/shared/components/ui/field";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import { CreateGroupForm } from "../components/create-group-form";

interface Props {
  businessSlug: string;
}

function PermissionsList() {
  "use no memo";
  const { form } = CreateGroupForm.useCreateGroupForm();

  const permissionsSelected = form.watch("permissions") ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selección de permisos</CardTitle>
        <CardDescription>
          Selecciona los permisos que deseas asignar a este grupo.
        </CardDescription>
        <CardDescription>
          {permissionsSelected.length} permisos seleccionados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateGroupForm.Permissions />
      </CardContent>
    </Card>
  );
}

export function CreateGroupScreen({ businessSlug }: Props) {
  const { data: business } = useSuspenseQuery(
    businessQueriesOptions.findOne(businessSlug)
  );

  const businessHasDefaultGroup = business?.groups.some(
    (group) => group.isDefault
  );

  return (
    <ScrollView className="px-4">
      <CreateGroupForm.Root businessSlug={businessSlug}>
        <FieldSet className="flex gap-y-2 pt-4 pb-10">
          <CreateGroupForm.Name />
          <CreateGroupForm.Description />
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
        </FieldSet>
      </CreateGroupForm.Root>
    </ScrollView>
  );
}
