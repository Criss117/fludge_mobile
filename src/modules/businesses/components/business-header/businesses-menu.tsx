import { useAuth } from "@/modules/auth/providers/auth.provider";
import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { spliText } from "@/modules/shared/lib/utils";
import type { BusinessDetail } from "@/shared/entities/business.entity";
import { Link } from "expo-router";
import { Building2, ChevronDownIcon, PlusIcon } from "lucide-react-native";
import { View } from "react-native";
interface Props {
  currentBusiness: BusinessDetail;
}

export function BusinessesMenu({ currentBusiness }: Props) {
  const { user } = useAuth();

  if (!user) return null;

  if (!user.isRoot) {
    return (
      <View className="flex items-center justify-center flex-row px-5 py-2 gap-2">
        <View className="bg-primary/10 p-1 rounded-md">
          <Icon as={Building2} size={20} />
        </View>
        <Text className="text-base">{currentBusiness.name}</Text>
      </View>
    );
  }

  const otherBusinesses =
    user.isRootIn?.filter((business) => business.id !== currentBusiness.id) ??
    [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="flex items-center justify-center"
        >
          <View className="bg-primary/10 p-1 rounded-md">
            <Icon as={Building2} size={20} />
          </View>
          <Text>{spliText(currentBusiness.name, 20)}</Text>
          <Icon as={ChevronDownIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Mis negocios</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherBusinesses.length === 0 && (
          <Text>No tienes más negocios registrados</Text>
        )}
        <View className="flex gap-y-2">
          {otherBusinesses.map((business) => (
            <DropdownMenuItem key={business.id} asChild>
              <Link
                href={{
                  pathname: "/businesses/[businessSlug]/(tabs)",
                  params: {
                    businessSlug: business.slug,
                  },
                }}
                push
                asChild
              >
                <Button variant="outline" className="justify-start">
                  <Icon as={Building2} size={20} />
                  <Text>{spliText(business.name, 25)}</Text>
                </Button>
              </Link>
            </DropdownMenuItem>
          ))}
        </View>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/businesses/register" push asChild>
            <Button>
              <Icon as={PlusIcon} size={20} />
              <Text>Registrar nuevo negocio</Text>
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
