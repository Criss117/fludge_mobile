import { FormInput } from "@/modules/shared/components/form/form-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  type CreateEmployeeSchema,
  createEmployeeSchema,
} from "@/shared/schemas/employees/create-employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useMutateEmployees } from "../hooks/use.mutate-employees";

interface Context {
  form: ReturnType<typeof useForm<CreateEmployeeSchema>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

interface RootProps {
  businessSlug: string;
  children: React.ReactNode;
}

const employeeFormContext = createContext<Context | null>(null);

function useEmployeeFormContext() {
  const context = use(employeeFormContext);

  if (context === null) {
    throw new Error("useEmployeeFormContext must be used within a Provider");
  }

  return context;
}

function Root({ children, businessSlug }: RootProps) {
  const { create } = useMutateEmployees();
  const router = useRouter();
  const form = useForm<CreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      phone: "",
      salary: 0,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    create.mutate(
      {
        businessSlug,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
          router.back();
        },
      }
    );
  });

  return (
    <employeeFormContext.Provider
      value={{ form, onSubmit, isPending: create.isPending }}
    >
      {children}
    </employeeFormContext.Provider>
  );
}

function FirstName() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Nombre"
      name="firstName"
      placeholder="Nombre"
      form={form}
      required
    />
  );
}

function LastName() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Apellido"
      name="lastName"
      placeholder="Apellido"
      form={form}
      required
    />
  );
}

function Username() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Nombre de usuario"
      name="username"
      placeholder="Nombre de usuario"
      form={form}
      required
    />
  );
}

function Password() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Contraseña"
      name="password"
      placeholder="Contraseña"
      form={form}
      secureTextEntry
      required
    />
  );
}

function Phone() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Teléfono"
      name="phone"
      placeholder="Teléfono"
      form={form}
      keyboardType="numeric"
    />
  );
}

function Salary() {
  const { form } = useEmployeeFormContext();

  return (
    <FormInput
      label="Salario"
      name="salary"
      placeholder="Salario"
      form={form}
      inputMode="numeric"
      required
    />
  );
}

function Submit() {
  const { isPending, onSubmit } = useEmployeeFormContext();

  return (
    <Button onPress={onSubmit} disabled={isPending}>
      {isPending && <ActivityIndicator className="text-white" />}
      {!isPending && <Text>Registrar Empleado</Text>}
    </Button>
  );
}

export const EmployeeForm = {
  Root,
  useEmployeeFormContext,
  FirstName,
  LastName,
  Username,
  Password,
  Phone,
  Salary,
  Submit,
};
