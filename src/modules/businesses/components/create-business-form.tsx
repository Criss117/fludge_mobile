"use no memo";

import { useAuth } from "@/modules/auth/providers/auth.provider";
import { FormInput } from "@/modules/shared/components/form/form-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  createBusinessSchema,
  type CreateBusinessSchema,
} from "@/shared/schemas/businesses/create-business.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useMutateBusinesses } from "../hooks/use.mutate-businesses";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: ReturnType<typeof useForm<CreateBusinessSchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

const CreateBusinessContext = createContext<Context | null>(null);

function useCreateBusinessContext() {
  const context = use(CreateBusinessContext);

  if (context === null) {
    throw new Error("useCreateBusinessContext must be used within a Provider");
  }

  return context;
}

function Root({ children }: RootProps) {
  const router = useRouter();
  const { refetch } = useAuth();
  const { create } = useMutateBusinesses();
  const form = useForm<CreateBusinessSchema>({
    defaultValues: {
      name: "",
      nit: "",
    },
    resolver: zodResolver(createBusinessSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    create.mutate(data, {
      onSuccess: ({ data }) => {
        refetch().then(() => {
          if (!data) return;

          router.push({
            pathname: "/businesses/[businessSlug]",
            params: {
              businessSlug: data.slug,
            },
          });
        });
      },
    });
  });

  return (
    <CreateBusinessContext.Provider
      value={{
        form,
        onSubmit,
        isPending: create.isPending,
      }}
    >
      {children}
    </CreateBusinessContext.Provider>
  );
}

function Name() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="Nombre del negocio"
      name="name"
      placeholder="Ej: Mi Supermercado"
      form={form}
      required
    />
  );
}

function Nit() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="NIT"
      name="nit"
      placeholder="EJ: 9000231434"
      form={form}
      required
    />
  );
}

function Email() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="Email"
      name="email"
      placeholder="Email"
      form={form}
      keyboardType="email-address"
      required
    />
  );
}

function Phone() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="Teléfono"
      name="phone"
      placeholder="Teléfono"
      form={form}
      keyboardType="number-pad"
      required
    />
  );
}

function LegalName() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="Razón social"
      name="legalName"
      placeholder="Nombre legal del negocio"
      form={form}
      required
    />
  );
}

function Address() {
  const { form } = useCreateBusinessContext();

  return (
    <FormInput
      label="Dirección"
      name="address"
      placeholder="Dirección"
      form={form}
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useCreateBusinessContext();

  return (
    <Button size="lg" className="mt-4" onPress={onSubmit} disabled={isPending}>
      {isPending && <ActivityIndicator className="text-white" />}
      {!isPending && <Text>Crear negocio</Text>}
    </Button>
  );
}

export const CreateBusinessForm = {
  useCreateBusinessContext,
  Root,
  Name,
  Nit,
  Email,
  Phone,
  LegalName,
  Address,
  Submit,
};
