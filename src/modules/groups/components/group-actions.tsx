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
import type { GroupSummary } from "@/shared/entities/group.entity";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react-native";
import { UpdateGroupFormDialog } from "./update-group-form-dialog";

interface Props {
  group: GroupSummary;
  businessSlug: string;
}

export function GroupActions({ businessSlug, group }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon as={MoreVerticalIcon} size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem asChild>
          <UpdateGroupFormDialog group={group} businessSlug={businessSlug} />
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
