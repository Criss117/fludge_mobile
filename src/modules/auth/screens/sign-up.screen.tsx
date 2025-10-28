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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SignUpForm } from "../components/sign-up-form";

export default function SignUpScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 flex justify-center items-center gap-y-2 relative">
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
              <Text>Ta tienes una cuenta?</Text>
            </Button>
          </Link>
          <Link href="/auth/sign-in" asChild replace>
            <Button variant="link">
              <Text>Olvidaste tu contraseña?</Text>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </SafeAreaView>
  );
}
