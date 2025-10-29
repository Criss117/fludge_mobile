import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/modules/shared/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { firstLetterToUpperCase } from "@/modules/shared/lib/utils";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { View } from "react-native";

interface Props {
  business: BusinessDetail;
}

export function BusinessHeaderSection({ business }: Props) {
  return (
    <View>
      <Card className="relative overflow-visible mt-24">
        <Avatar
          alt={business.name}
          className="h-32 w-32 absolute bottom-44 left-1/3 bg-secondary z-50"
        >
          <AvatarImage
            source={{
              uri: "https://picsum.photos/200",
            }}
          />
          <AvatarFallback className="bg-primary">
            <Text className="text-5xl">
              {firstLetterToUpperCase(business.name)}
            </Text>
          </AvatarFallback>
        </Avatar>
        <CardHeader className="mt-10">
          <View>
            <CardTitle className="text-2xl text-center text-primary">
              {business.name}
            </CardTitle>
            <Text className="text-center text-muted-foreground text-sm">
              Propietario:{" "}
              <Text>
                {business.rootUser.firstName} {business.rootUser.lastName}
              </Text>
            </Text>
          </View>

          <View className="flex justify-between flex-row">
            <CardDescription>NIT: {business.nit}</CardDescription>
            <CardDescription>
              Teléfono:{" "}
              {business.phone ? (
                business.phone
              ) : (
                <Text className="text-sm text-muted-foreground italic">
                  -Sin teléfono-
                </Text>
              )}
            </CardDescription>
          </View>
          <CardDescription>
            Dirección:{" "}
            {business.address ? (
              business.address
            ) : (
              <Text className="text-sm text-muted-foreground italic">
                -Sin dirección-
              </Text>
            )}
          </CardDescription>
          <CardDescription>
            Correo electrónico:{" "}
            {business.email ? (
              business.email
            ) : (
              <Text className="text-sm text-muted-foreground italic">
                -Sin correo electrónico-
              </Text>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </View>
  );
}
