import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Icon } from "@/modules/shared/components/ui/icon";
import type { EmployeeSummary } from "@/shared/entities/employee.entity";
import { MoreVerticalIcon } from "lucide-react-native";

interface Props {
  employee: EmployeeSummary;
  businessId: string;
}

export function EmployeeActions({ businessId, employee }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Icon as={MoreVerticalIcon} size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent></DropdownMenuContent>
    </DropdownMenu>
  );
}
