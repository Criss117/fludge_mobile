import { ToggleTheme } from "@/modules/shared/components/toggle-theme";
import { Button } from "@/modules/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { SignInEmployeeForm } from "../components/sign-in-employee-form";

export default function SignInEmployeeScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 flex justify-center items-center gap-y-2 relative">
      <View className="absolute right-5" style={{ top: top }}>
        <ToggleTheme />
      </View>
      <Text className="text-5xl font-bold h-14">Fludge</Text>
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle className="text-xl">Inicia Sesíon como Empleado</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear tu cuenta en Fludge
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-y-4">
          <SignInEmployeeForm.Root>
            <SignInEmployeeForm.RootError />
            <SignInEmployeeForm.Username />
            <SignInEmployeeForm.Password />
            <SignInEmployeeForm.Submit />
          </SignInEmployeeForm.Root>
          <Text className="text-center">ó</Text>
          <Link href="/auth/sign-in" asChild replace>
            <Button variant="link">
              <Text>Inicia session como usuario root</Text>
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Link href="/auth/sign-up" asChild replace>
        <Button variant="link">
          <Text>No tienes una cuenta?</Text>
        </Button>
      </Link>
      <Link href="/auth/sign-in" asChild replace>
        <Button variant="link">
          <Text>Olvidaste tu contraseña?</Text>
        </Button>
      </Link>
    </SafeAreaView>
  );
}
