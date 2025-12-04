import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { BanknoteIcon } from "lucide-react-native";
import { View } from "react-native";

export function WithoutClient() {
  return (
    <Card className="py-2">
      <CardContent className="px-2">
        <View className="rounded-md flex flex-row justify-between items-center bg-primary/20 px-2 py-3">
          <View className="flex flex-row items-center gap-x-2">
            <Icon as={BanknoteIcon} size={24} />
            <Text variant="large">Pagar Ahora</Text>
          </View>
          <Checkbox checked onCheckedChange={() => {}} className="size-5" />
        </View>
      </CardContent>
    </Card>
  );
}
