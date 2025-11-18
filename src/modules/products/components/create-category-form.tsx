import { FormInput } from "@/modules/shared/components/form/form-input";
import { FormTextArea } from "@/modules/shared/components/form/form-text-area";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/shared/schemas/products/create-category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useMutateCategories } from "../hooks/use.mutate-categories";

interface RootProps {
  children: React.ReactNode;
  businessId: string;
}

interface Context {
  form: ReturnType<typeof useForm<CreateCategorySchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

const CreateCategoryFormContext = createContext<Context | null>(null);

function useCreateCategory() {
  const context = use(CreateCategoryFormContext);

  if (!context) {
    throw new Error(
      "useCreateCategory must be used within a CreateCategoryProvider"
    );
  }

  return context;
}

function Root({ businessId, children }: RootProps) {
  const { create } = useMutateCategories();
  const router = useRouter();
  const form = useForm<CreateCategorySchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    create.mutate(
      {
        businessId,
        data: values,
      },
      {
        onSuccess: () => {
          form.reset();
          router.replace({
            pathname: "/businesses/[businessId]/(tabs)/products/categories",
            params: {
              businessId,
            },
          });
        },
      }
    );
  });

  return (
    <CreateCategoryFormContext.Provider
      value={{
        form,
        onSubmit,
        isPending: create.isPending,
      }}
    >
      {children}
    </CreateCategoryFormContext.Provider>
  );
}

function Name() {
  const { form } = useCreateCategory();

  return (
    <FormInput
      label="Nombre de la categoría"
      name="name"
      placeholder="Nombre de la categoría"
      form={form}
      required
    />
  );
}

function Description() {
  const { form } = useCreateCategory();

  return (
    <FormTextArea
      label="Descripción de la categoría"
      name="description"
      placeholder="Descripción de la categoría"
      form={form}
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useCreateCategory();

  return (
    <Button onPress={onSubmit} disabled={isPending}>
      {isPending && <ActivityIndicator className="text-white" />}
      {!isPending && <Text>Crear categoría</Text>}
    </Button>
  );
}

export const CreateCategoryForm = {
  useCreateCategory,
  Root,
  Name,
  Description,
  Submit,
};
