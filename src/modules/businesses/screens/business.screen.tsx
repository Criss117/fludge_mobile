import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { UserAvatar } from "@/modules/shared/components/user-avatar";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusinessCardsInfoSection } from "../sections/business-cards-info.section";
import { BusinessHeaderSection } from "../sections/business-header.section";
import { BusinessListsSection } from "../sections/business-lists.section";

interface Props {
  business: BusinessDetail;
}

export function BusinessScreen({ business }: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: top }}
    >
      <View className="flex gap-y-7 mb-4">
        <BusinessHeaderSection business={business} />
        <BusinessCardsInfoSection business={business} />
        <BusinessListsSection business={business} />
        <Card>
          <CardHeader>
            <CardTitle>Administrador Principal</CardTitle>
            <CardDescription>Usuario Root del negocio</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row justify-between items-start">
            <View className="flex flex-row items-center gap-x-2">
              <UserAvatar
                firstName={business.rootUser.firstName}
                lastName={business.rootUser.lastName}
                alt={`${business.rootUser.firstName} ${business.rootUser.lastName}`}
                size="size-12"
              />
              <View>
                <Text className="font-semibold text-xl">
                  {business.rootUser.firstName} {business.rootUser.lastName}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {business.rootUser.email}
                </Text>
              </View>
            </View>
            <Badge className="rounded-full">
              <Text>Root</Text>
            </Badge>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
