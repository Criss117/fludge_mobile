import {
  Card,
  CardContent,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Skeleton } from "@/modules/shared/components/ui/skeleton";
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
  description: string;
  amount: number;
  href: Href;
}

interface CardInfoSkeletonProps {
  icon: LucideIcon;
}

function CardInfo({ amount, icon, description, href }: CardInfoProps) {
  const router = useRouter();

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => router.push(href)}>
      <Card className="flex-1 size-40">
        <CardHeader>
          <Icon as={icon} size={32} className="text-primary" />
        </CardHeader>
        <CardContent className="flex-1 flex justify-end">
          <Text className="font-semibold text-2xl">{amount}</Text>
          <Text className="text-sm text-muted-foreground">{description}</Text>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

function CardInfoSkeleton({ icon }: CardInfoSkeletonProps) {
  return (
    <Card className="flex-1 size-40">
      <CardHeader>
        <Icon as={icon} size={32} className="text-primary" />
      </CardHeader>
      <CardContent className="flex-1 flex justify-end gap-y-1">
        <Skeleton className="h-6 w-1/4 rounded-lg  bg-muted-foreground" />
        <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
        <Skeleton className="h-4 w-3/4 rounded-lg  bg-muted-foreground" />
      </CardContent>
    </Card>
  );
}

export function BusinessCardsInfoSection({ business }: Props) {
  const cardsInfo = [
    {
      icon: Users2Icon,
      description: "Clientes registrados",
      amount: 0,
      href: {
        pathname: "/businesses/[businessId]/(tabs)/clients",
        params: {
          businessId: business.id,
        },
      },
    },
    {
      icon: PackageSearch,
      description: "Productos registrados",
      amount: 0,
      href: {
        pathname: "/businesses/[businessId]/(tabs)/products",
        params: {
          businessId: business.id,
        },
      },
    },
    {
      icon: IdCardLanyard,
      description: "Empleados totales",
      amount: business.employees.length,
      href: {
        pathname: "/businesses/[businessId]/(tabs)/management",
        params: {
          businessId: business.id,
        },
      },
    },
    {
      icon: UngroupIcon,
      description: "Grupos de permisos",
      amount: business.employees.length,
      href: {
        pathname: "/businesses/[businessId]/(tabs)/management/groups",
        params: {
          businessId: business.id,
        },
      },
    },
  ] as const satisfies CardInfoProps[];

  return (
    <FlatList
      data={cardsInfo}
      keyExtractor={(item, index) => `${index}-${item.description}`}
      renderItem={({ item }) => <CardInfo {...item} />}
      ItemSeparatorComponent={() => <View className="w-4" />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
}

export function BusinessCardsInfoSectionSkeleton() {
  const cardsInfo = [
    {
      icon: Users2Icon,
    },
    {
      icon: PackageSearch,
    },
    {
      icon: IdCardLanyard,
    },
    {
      icon: UngroupIcon,
    },
  ] as const satisfies CardInfoSkeletonProps[];

  return (
    <FlatList
      data={cardsInfo}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => <CardInfoSkeleton {...item} />}
      ItemSeparatorComponent={() => <View className="w-4" />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
}
