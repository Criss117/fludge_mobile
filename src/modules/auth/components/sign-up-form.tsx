import { FormInput } from "@/modules/shared/components/form/form-input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/modules/shared/components/ui/alert";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";

import {
  signUpSchema,
  SignUpSchema,
} from "@/shared/schemas/auth/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { TriangleAlert } from "lucide-react-native";
import { createContext, use } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../providers/auth.provider";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: UseFormReturn<SignUpSchema, unknown, SignUpSchema>;
  isPending: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const SignUpFormContext = createContext<Context | null>(null);

function useSignUpForm() {
  const context = use(SignUpFormContext);

  if (!context) {
    throw new Error("useSignUpForm must be used within a SignInFormProvider");
  }

  return context;
}

function Root({ children }: RootProps) {
  const router = useRouter();
  const { signUp } = useAuth();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "cristian@fludge.dev",
      password: "holiwiss",
      firstName: "Cristian",
      lastName: "Gonzalez",
      phone: "3206247918",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signUp.mutate(data, {
      onSuccess: () => {
        router.replace("/auth/sign-in");
      },
      onError: (err) => {
        form.setError("root", {
          message: err.message ?? "Error al crear la cuenta",
        });
      },
    });
  });

  return (
    <SignUpFormContext.Provider
      value={{
        form,
        isPending: signUp.isPending,
        onSubmit,
      }}
    >
      {children}
    </SignUpFormContext.Provider>
  );
}

function RootError() {
  const { form } = useSignUpForm();

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

function EmailInput() {
  const { form } = useSignUpForm();

  return (
    <FormInput
      form={form}
      name="email"
      label="Correo electrónico"
      keyboardType="email-address"
    />
  );
}

function PasswordInput() {
  const { form } = useSignUpForm();

  return (
    <FormInput form={form} name="password" label="Contraseña" secureTextEntry />
  );
}

function FirstNameInput() {
  const { form } = useSignUpForm();

  return <FormInput form={form} name="firstName" label="Nombre" />;
}

function LastNameInput() {
  const { form } = useSignUpForm();

  return <FormInput form={form} name="lastName" label="Apellido" />;
}

function PhoneInput() {
  const { form } = useSignUpForm();

  return (
    <FormInput
      form={form}
      name="phone"
      label="Teléfono"
      keyboardType="number-pad"
    />
  );
}

function Submit() {
  const { onSubmit, isPending } = useSignUpForm();

  return (
    <Button onPress={onSubmit}>
      {!isPending && <Text>Iniciar sesión</Text>}
      {isPending && <ActivityIndicator className="text-white" />}
    </Button>
  );
}

export const SignUpForm = {
  Root,
  useSignUpForm,
  EmailInput,
  PasswordInput,
  Submit,
  RootError,
  FirstNameInput,
  LastNameInput,
  PhoneInput,
};
