import { FormInput } from "@/modules/shared/components/form/form-input";
import { FormTextArea } from "@/modules/shared/components/form/form-text-area";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  createGroupSchema,
  CreateGroupSchema,
} from "@/shared/schemas/groups/create-group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";

interface Context {
  form: ReturnType<typeof useForm<CreateGroupSchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

interface RootProps {
  children: React.ReactNode;
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

function Root({ children }: RootProps) {
  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <CreateGroupFormContext.Provider
      value={{
        form,
        onSubmit,
        isPending: false,
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
};
