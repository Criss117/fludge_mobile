import { ToggleTheme } from "@/modules/shared/components/toggle-theme";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { Link } from "expo-router";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignUpForm } from "../components/sign-up-form";

export default function SignUpScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      bottomOffset={100}
      contentContainerClassName="flex items-center justify-center flex-1 relative"
    >
      <View className="absolute right-5" style={{ top: top + 10 }}>
        <ToggleTheme />
      </View>
      <Text className="text-5xl font-bold h-14">Fludge</Text>
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear tu cuenta en Fludge
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-y-4">
          <SignUpForm.Root>
            <SignUpForm.RootError />
            <SignUpForm.FirstNameInput />
            <SignUpForm.LastNameInput />
            <SignUpForm.PhoneInput />
            <SignUpForm.EmailInput />
            <SignUpForm.PasswordInput />
            <SignUpForm.Submit />
          </SignUpForm.Root>
        </CardContent>
        <CardFooter className="flex justify-center items-center flex-col">
          <Link href="/auth/sign-in" asChild replace>
            <Button variant="link">
              <Text>Ya tienes una cuenta?</Text>
            </Button>
          </Link>
          <Link href="/auth/sign-in" asChild replace>
            <Button variant="link">
              <Text>Olvidaste tu contraseña?</Text>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </KeyboardAwareScrollView>
  );
}
