import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { Link } from "expo-router";
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react-native";

interface Props {
  productId: string;
  businessId: string;
}

export function ProductMenuActions({ businessId, productId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon as={MoreVerticalIcon} size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: "/businesses/[businessId]/products/[productId]/update",
              params: {
                businessId,
                productId,
              },
            }}
            asChild
            push
          >
            <Button variant="outline">
              <Icon as={PencilIcon} size={16} />
              <Text>Editar</Text>
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="destructive" disabled>
            <Icon as={Trash2Icon} size={16} />
            <Text>Eliminar</Text>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
