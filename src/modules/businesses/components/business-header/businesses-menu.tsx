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
          <Text className="text-base">{currentBusiness.name}</Text>
          <Icon as={ChevronDownIcon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Mis negocios</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherBusinesses.length === 0 && (
          <Text>No tienes más negocios registrados</Text>
        )}
        {otherBusinesses.map((business) => (
          <DropdownMenuItem key={business.id} asChild>
            <Link
              href={{
                pathname: "/businesses/[businessSlug]",
                params: {
                  businessSlug: business.slug,
                },
              }}
              replace
              asChild
            >
              <Button variant="link">
                <Icon as={Building2} size={20} className="text-primary" />
                <Text>{business.name}</Text>
              </Button>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: "/businesses/register",
            }}
            push
            asChild
          >
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
