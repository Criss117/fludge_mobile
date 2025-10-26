import { FormInput } from "@/modules/shared/components/form/form-input";
import { Button } from "@/modules/shared/components/ui/button";
import { Text } from "@/modules/shared/components/ui/text";
import {
  signInSchema,
  type SignInDto,
} from "@/shared/schemas/auth/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";

interface RootProps {
  children: React.ReactNode;
}

interface Context {
  form: UseFormReturn<SignInDto, unknown, SignInDto>;
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
  const form = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log({ data });
  });

  return (
    <SignInFormContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </SignInFormContext.Provider>
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
  const { onSubmit } = useSignInForm();

  return (
    <Button onPress={onSubmit}>
      <Text>Iniciar sesión</Text>
    </Button>
  );
}

export const SignInForm = {
  Root,
  useSignInForm,
  EmailInput,
  PasswordInput,
  Submit,
};
