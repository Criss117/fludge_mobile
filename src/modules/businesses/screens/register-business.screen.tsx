import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Building2, CheckCircle } from "lucide-react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateBusinessForm } from "../components/create-business-form";

export function RegisterBusinessScreen() {
  return (
    <KeyboardAwareScrollView>
      <View className="flex gap-y-3 px-4 pt-5">
        <Card className="w-full">
          <CardHeader>
            <View className="flex flex-row gap-x-2 items-center">
              <Icon as={Building2} size={29} />
              <CardTitle variant="h4">Registra tu Negocio</CardTitle>
            </View>
            <CardDescription>
              Completa la información para comenzar a gestionar tu empresa
            </CardDescription>
          </CardHeader>
        </Card>

        <CreateBusinessForm.Root>
          <Card>
            <CardHeader className="flex items-center flex-row gap-x-2">
              <Icon as={CheckCircle} size={20} />
              <CardTitle variant="h4">Información básica</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <CreateBusinessForm.Name />
              <CreateBusinessForm.Nit />
              <CreateBusinessForm.LegalName />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center flex-row gap-x-2">
              <Icon as={CheckCircle} size={20} />
              <CardTitle variant="h4">Informacíon de contacto</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-y-2">
              <CreateBusinessForm.Email />
              <CreateBusinessForm.Phone />
              <CreateBusinessForm.Address />
            </CardContent>
          </Card>

          <CreateBusinessForm.Submit />
        </CreateBusinessForm.Root>
      </View>
    </KeyboardAwareScrollView>
  );
}
