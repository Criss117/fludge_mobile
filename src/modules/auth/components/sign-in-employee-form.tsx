import { FormInput } from "@/modules/shared/components/form/form-input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/modules/shared/components/ui/alert";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  signInEmployeeSchema,
  SignInEmployeeSchema,
} from "@/shared/schemas/auth/sign-in-employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react-native";
import { createContext, use } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../providers/auth.provider";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: ReturnType<typeof useForm<SignInEmployeeSchema>>;
  isPending: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const SignInFormContext = createContext<Context | null>(null);

function useSignInForm() {
  const context = use(SignInFormContext);

  if (!context) {
    throw new Error("useSignInForm must be used within a SignInFormProvider");
  }

  return context;
}

function Root({ children }: RootProps) {
  const { signInEmployee } = useAuth();
  const form = useForm<SignInEmployeeSchema>({
    resolver: zodResolver(signInEmployeeSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signInEmployee.mutate(data, {
      onError: (err) => {
        form.setError("root", {
          message: err.message ?? "Error al iniciar sesión",
        });
      },
    });
  });

  return (
    <SignInFormContext.Provider
      value={{
        form,
        isPending: signInEmployee.isPending,
        onSubmit,
      }}
    >
      {children}
    </SignInFormContext.Provider>
  );
}

function RootError() {
  const { form } = useSignInForm();

  if (!form.formState.errors.root?.message) {
    return null;
  }

  return (
    <Alert icon={TriangleAlert} variant="destructive">
      <AlertTitle>Error al iniciar sesión</AlertTitle>
      <AlertDescription>{form.formState.errors.root?.message}</AlertDescription>
    </Alert>
  );
}

function Username() {
  const { form } = useSignInForm();

  return (
    <FormInput
      form={form}
      name="username"
      label="Nombre de usuario"
      description="Ingresa tu nombre de usuario"
      placeholder="criscvc"
      required
    />
  );
}

function Password() {
  const { form } = useSignInForm();

  return (
    <FormInput
      form={form}
      name="password"
      label="Contraseña"
      placeholder="12345678"
      description="Ingresa tu contraseña"
      secureTextEntry
      required
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useSignInForm();

  return (
    <Button onPress={onSubmit}>
      {!isPending && <Text>Iniciar sesión</Text>}
      {isPending && <ActivityIndicator className="text-white" />}
    </Button>
  );
}

export const SignInEmployeeForm = {
  Root,
  useSignInForm,
  Username,
  Password,
  Submit,
  RootError,
};
