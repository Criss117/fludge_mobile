import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { FieldLabel, FieldSet } from "@/modules/shared/components/ui/field";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Building2, CheckCircle } from "lucide-react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { CreateBusinessForm } from "../components/create-business-form";

export function RegisterBusinessScreen() {
  return (
    <KeyboardAwareScrollView>
      <View className="px-2 flex items-center justify-center flex-1 py-10">
        <Card className="w-full">
          <CardHeader>
            <View className="flex flex-row items-center gap-x-2 h-5">
              <Icon as={Building2} size={20} />
              <CardTitle className="h-5 text-center">
                Registra tu Negocio
              </CardTitle>
            </View>
            <CardDescription>
              Completa la información para comenzar a gestionar tu empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-y-4">
            <CreateBusinessForm.Root>
              <FieldSet>
                <View className="flex items-center flex-row gap-x-2">
                  <Icon as={CheckCircle} />
                  <FieldLabel className="font-semibold">
                    Información básica
                  </FieldLabel>
                </View>
                <CreateBusinessForm.Name />
                <CreateBusinessForm.Nit />
                <CreateBusinessForm.LegalName />
              </FieldSet>
              <FieldSet>
                <View className="flex items-center flex-row gap-x-2">
                  <Icon as={CheckCircle} />
                  <FieldLabel className="font-semibold">
                    Informacíon de contacto
                  </FieldLabel>
                </View>
                <CreateBusinessForm.Email />
                <CreateBusinessForm.Phone />
                <CreateBusinessForm.Address />
              </FieldSet>
              <CreateBusinessForm.Submit />
            </CreateBusinessForm.Root>
          </CardContent>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
