import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import {
  IdCardLanyard,
  LucideIcon,
  PackageSearch,
  UngroupIcon,
  Users2Icon,
} from "lucide-react-native";
import { View } from "react-native";

interface Props {
  business: BusinessDetail;
}

interface CardInfoProps {
  icon: LucideIcon;
  title: string;
  amount: number;
}

function CardInfo({ amount, icon, title }: CardInfoProps) {
  return (
    <Card className="flex-1">
      <CardContent className="flex items-center">
        <Icon as={icon} size={32} />
        <Text className="text-xl font-black text-center">{title}</Text>
        <Text className="text-xl font-semibold">{amount}</Text>
      </CardContent>
    </Card>
  );
}

export function BusinessCardsInfoSection({ business }: Props) {
  const cardsInfo = [
    {
      icon: IdCardLanyard,
      title: "Empleados",
      amount: business.employees.length,
    },
    {
      icon: UngroupIcon,
      title: "Grupos",
      amount: business.employees.length,
    },
    {
      icon: PackageSearch,
      title: "Productos",
      amount: 0,
    },
    {
      icon: Users2Icon,
      title: "Clientes",
      amount: 0,
    },
  ] satisfies CardInfoProps[];

  return (
    <View className="flex gap-y-4">
      <View className="flex flex-row gap-x-4">
        <CardInfo {...cardsInfo[0]} />
        <CardInfo {...cardsInfo[1]} />
      </View>
      <View className="flex flex-row gap-x-4">
        <CardInfo {...cardsInfo[2]} />
        <CardInfo {...cardsInfo[3]} />
      </View>
    </View>
  );
}
