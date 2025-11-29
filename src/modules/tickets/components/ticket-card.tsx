import {
  Card,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { TicketSummary } from "@/shared/entities/tickets.entity";
import { Receipt } from "lucide-react-native";
import { Pressable, View } from "react-native";

interface Props {
  ticket: TicketSummary;
}

export function TicketCard({ ticket }: Props) {
  return (
    <Pressable>
      <Card className="py-3">
        <CardHeader className="px-3 flex flex-row">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={Receipt} size={24} />
          </View>
          <CardTitle>{ticket.id}</CardTitle>
        </CardHeader>
      </Card>
    </Pressable>
  );
}
