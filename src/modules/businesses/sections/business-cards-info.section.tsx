import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { Href, useRouter } from "expo-router";
import {
  IdCardLanyard,
  LucideIcon,
  PackageSearch,
  UngroupIcon,
  Users2Icon,
} from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

interface Props {
  business: BusinessDetail;
}

interface CardInfoProps {
  icon: LucideIcon;
  title: string;
  amount: number;
  href: Href;
}

function CardInfo({ amount, icon, title, href }: CardInfoProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(href)}>
      <Card className="flex-1 w-40">
        <CardContent className="flex items-center">
          <Icon as={icon} size={32} className="text-primary" />
          <Text className="text-xl font-black text-center">{title}</Text>
          <Text className="text-xl font-semibold text-muted-foreground">
            {amount}
          </Text>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

export function BusinessCardsInfoSection({ business }: Props) {
  const cardsInfo = [
    {
      icon: Users2Icon,
      title: "Clientes",
      amount: 0,
      href: {
        pathname: "/businesses/[businessSlug]/(tabs)/clients",
        params: {
          businessSlug: business.slug,
        },
      },
    },
    {
      icon: PackageSearch,
      title: "Productos",
      amount: 0,
      href: {
        pathname: "/businesses/[businessSlug]/(tabs)/products",
        params: {
          businessSlug: business.slug,
        },
      },
    },
    {
      icon: IdCardLanyard,
      title: "Empleados",
      amount: business.employees.length,
      href: {
        pathname: "/businesses/[businessSlug]/(tabs)/management",
        params: {
          businessSlug: business.slug,
        },
      },
    },
    {
      icon: UngroupIcon,
      title: "Grupos",
      amount: business.employees.length,
      href: {
        pathname: "/businesses/[businessSlug]/(tabs)/management/groups",
        params: {
          businessSlug: business.slug,
        },
      },
    },
  ] as const satisfies CardInfoProps[];

  return (
    <FlatList
      data={cardsInfo}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <CardInfo {...item} />}
      ItemSeparatorComponent={() => <View className="w-4" />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
}
