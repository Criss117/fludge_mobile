import { FormInput } from "@/modules/shared/components/form/form-input";
import { FormTextArea } from "@/modules/shared/components/form/form-text-area";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import type { GroupSummary } from "@/shared/entities/group.entity";
import {
  updateGroupSchema,
  type UpdateGroupSchema,
} from "@/shared/schemas/groups/update-group.scheam";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useMutateGroups } from "../hooks/use.mutate-groups";

interface Context {
  form: ReturnType<typeof useForm<UpdateGroupSchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

interface RootProps {
  children: React.ReactNode;
  group: GroupSummary;
  businessId: string;
  actions?: {
    onSuccess?: () => void;
  };
}

const UpdateGroupFormContext = createContext<Context | null>(null);

function useUpdateGroupForm() {
  const context = use(UpdateGroupFormContext);

  if (context === null) {
    throw new Error("useUpdateGroupForm must be used within a UpdateGroupForm");
  }

  return context;
}

function Root({ children, group, businessId, actions }: RootProps) {
  const { update } = useMutateGroups();
  const form = useForm<UpdateGroupSchema>({
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      description: group.description,
      name: group.name,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    update.mutate(
      {
        businessId,
        groupId: group.id,
        values: {
          name: values.name,
          description: values.description,
        },
      },
      {
        onSuccess: () => {
          actions?.onSuccess?.();
        },
      }
    );
  });

  return (
    <UpdateGroupFormContext.Provider
      value={{ form, onSubmit, isPending: update.isPending }}
    >
      {children}
    </UpdateGroupFormContext.Provider>
  );
}

function Name() {
  const { form } = useUpdateGroupForm();

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
  const { form } = useUpdateGroupForm();

  return (
    <FormTextArea
      label="Descripción del grupo"
      form={form}
      name="description"
      placeholder="Descripción del grupo"
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useUpdateGroupForm();

  return (
    <Button onPress={onSubmit} disabled={isPending}>
      {isPending && <ActivityIndicator className="text-white" />}
      {!isPending && <Text>Guardar</Text>}
    </Button>
  );
}

export const UpdateGroupForm = {
  useUpdateGroupForm,
  Root,
  Name,
  Submit,
  Description,
};
