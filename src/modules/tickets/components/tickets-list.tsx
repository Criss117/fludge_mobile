import { Button } from "@/modules/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import {
  BrushCleaningIcon,
  ChevronDown,
  PencilIcon,
  TrashIcon,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTicketsStore } from "../store/tickets.store";

export function TicketsList() {
  const [open, setOpen] = useState(false);
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const tickets = useTicketsStore((state) => state.tickets);
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);
  const changeCurrentTicket = useTicketsStore(
    (state) => state.changeCurrentTicket
  );
  const removeTicket = useTicketsStore((state) => state.removeTicket);
  const clearTicket = useTicketsStore((state) => state.clearTicket);
  const creteTiket = useTicketsStore((state) => state.createTicket);

  const ticketsIds = Array.from(tickets.keys());
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 0,
    right: 30,
  };

  const onChangeTicket = useCallback(
    (id: string) => {
      if (id === currentTicketId) return;
      changeCurrentTicket(id);
      setOpen(false);
    },
    [changeCurrentTicket, currentTicketId]
  );

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="lg">
          <Text className="text-lg">{currentTicketId}</Text>

          <Icon
            as={ChevronDown}
            size={24}
            style={{
              transform: [{ rotateX: open ? "180deg" : "0deg" }],
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        insets={contentInsets}
        align="center"
        style={{
          width: width - 64,
        }}
      >
        <DropdownMenuLabel>
          <Text>Listado de tickets</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {ticketsIds.map((id) => (
            <DropdownMenuItem
              key={id}
              onPress={() => onChangeTicket(id)}
              className={cn("flex flex-row justify-between", {
                "bg-accent": id === currentTicketId,
              })}
            >
              <View>
                <Text variant="h3">{id}</Text>
              </View>
              <View className="flex flex-row gap-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onPress={() => clearTicket(id)}
                >
                  <Icon as={BrushCleaningIcon} size={18} />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full"
                  onPress={() => clearTicket(id)}
                >
                  <Icon as={PencilIcon} size={18} className="text-white" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onPress={() => removeTicket(id)}
                >
                  <Icon as={TrashIcon} size={18} className="text-white" />
                </Button>
              </View>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className="flex-1" onPress={() => creteTiket("ticket-2")}>
            <Text>Crear nuevo ticket</Text>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
