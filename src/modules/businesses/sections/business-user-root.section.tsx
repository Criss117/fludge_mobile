import { Badge } from "@/modules/shared/components/ui/badge";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Text } from "@/modules/shared/components/ui/text";
import { UserAvatar } from "@/modules/shared/components/user-avatar";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { View } from "react-native";

interface Props {
  business: BusinessDetail;
}

export function BusinessUserRootSection({ business }: Props) {
  return (
    <View className="flex gap-y-2">
      <Text variant="h4">Usuario Root</Text>
      <Card>
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
  );
}
