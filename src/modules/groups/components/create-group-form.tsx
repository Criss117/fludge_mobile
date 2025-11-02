"use no memo";

import { FormInput } from "@/modules/shared/components/form/form-input";
import { FormSwitch } from "@/modules/shared/components/form/form-switch";
import { FormTextArea } from "@/modules/shared/components/form/form-text-area";
import { Button } from "@/modules/shared/components/ui/button";
import { FieldError } from "@/modules/shared/components/ui/field";
import { Text } from "@/modules/shared/components/ui/text";
import { allPermission, Permission } from "@/shared/entities/permissions";
import {
  createGroupSchema,
  CreateGroupSchema,
} from "@/shared/schemas/groups/create-group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Insets, ScrollView, View } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";
import { PermissionCard } from "./permission-card";

interface Context {
  form: ReturnType<typeof useForm<CreateGroupSchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

interface RootProps {
  businessSlug: string;
  children: React.ReactNode;
}

interface IsDefaultProps {
  disabled?: boolean;
  hitSlop?: number | Insets | null | undefined;
}

const CreateGroupFormContext = createContext<Context | null>(null);

function useCreateGroupForm() {
  const context = use(CreateGroupFormContext);

  if (!context) {
    throw new Error(
      "useCreateGroupForm must be used within a CreateGroupFormProvider"
    );
  }

  return context;
}

function Root({ children, businessSlug }: RootProps) {
  const { create } = useMutateGroups();
  const router = useRouter();
  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(
      {
        businessSlug,
        data,
      },
      {
        onSuccess: ({ data: createdGroup }) => {
          if (!createdGroup) return;

          router.push({
            pathname: "/businesses/[businessSlug]/groups/[groupId]",
            params: {
              businessSlug,
              groupId: createdGroup.id,
            },
          });
        },
      }
    );
  });

  return (
    <CreateGroupFormContext.Provider
      value={{
        form,
        onSubmit,
        isPending: create.isPending,
      }}
    >
      {children}
    </CreateGroupFormContext.Provider>
  );
}

function Name() {
  const { form } = useCreateGroupForm();

  return (
    <FormInput
      label="Nombre del grupo"
      form={form}
      name="name"
      placeholder="Nombre del grupo"
      required
    />
  );
}

function Description() {
  const { form } = useCreateGroupForm();

  return (
    <FormTextArea
      label="Descripción del grupo"
      form={form}
      name="description"
      placeholder="Descripción del grupo"
    />
  );
}

function Permissions() {
  const { form } = useCreateGroupForm();
  const selectedPermissions = form.watch("permissions") ?? [];
  const permissionsError = form.formState.errors.permissions;

  const handlePermissionSelect = (permission: Permission) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (selectedPermissions.includes(permission)) {
      form.setValue(
        "permissions",
        selectedPermissions.filter((p) => p !== permission)
      );
      return;
    }

    form.setValue("permissions", [...selectedPermissions, permission]);
  };

  return (
    <View className="flex gap-y-2">
      <FieldError errors={[permissionsError]} />
      <ScrollView className="max-h-96" nestedScrollEnabled>
        <View className="flex gap-y-2">
          {allPermission.map((permission) => (
            <PermissionCard
              key={permission}
              permission={permission}
              isSelected={selectedPermissions.includes(permission)}
              onPress={handlePermissionSelect}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function IsDefault({ disabled, hitSlop }: IsDefaultProps) {
  const { form } = useCreateGroupForm();

  return (
    <FormSwitch
      form={form}
      name="isDefault"
      label="Grupo por defecto"
      description="Los nuevos usuarios se añadirán automáticamente"
      disabled={disabled}
      hitSlop={hitSlop}
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useCreateGroupForm();

  return (
    <Button onPress={onSubmit} disabled={isPending}>
      {isPending && <ActivityIndicator className="text-white" />}
      {!isPending && <Text>Guardar</Text>}
    </Button>
  );
}

export const CreateGroupForm = {
  useCreateGroupForm,
  Root,
  Name,
  Submit,
  Description,
  IsDefault,
  Permissions,
};
