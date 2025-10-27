import { FormInput } from "@/modules/shared/components/form/form-input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/modules/shared/components/ui/alert";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  signInSchema,
  type SignInSchema,
} from "@/shared/schemas/auth/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react-native";
import { createContext, use } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../providers/auth.provider";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: UseFormReturn<SignInSchema, unknown, SignInSchema>;
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
  const { signIn } = useAuth();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "cristian@fludge.dev",
      password: "holiwiss",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signIn.mutate(data, {
      onSuccess: (res) => {
        console.log({ res });
      },
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
        isPending: signIn.isPending,
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

function EmailInput() {
  const { form } = useSignInForm();

  return <FormInput form={form} name="email" label="Correo electrónico" />;
}

function PasswordInput() {
  const { form } = useSignInForm();

  return (
    <FormInput form={form} name="password" label="Contraseña" secureTextEntry />
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

export const SignInForm = {
  Root,
  useSignInForm,
  EmailInput,
  PasswordInput,
  Submit,
  RootError,
};
