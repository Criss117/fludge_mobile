import { Badge } from "@/modules/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/modules/shared/components/ui/card";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Text } from "@/modules/shared/components/ui/text";
import { TicketSummary } from "@/shared/entities/tickets.entity";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Receipt } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { formatCurrency } from "../../shared/lib/utils";

interface Props {
  ticket: TicketSummary;
}

export function TicketCard({ ticket }: Props) {
  return (
    <Pressable>
      <Card className="py-3 flex flex-row justify-between items-center">
        <CardHeader className="px-3 flex flex-row">
          <View className="bg-primary/10 p-2 rounded-md">
            <Icon as={Receipt} size={24} />
          </View>
          <View>
            <CardDescription>
              {formatDistanceToNow(ticket.createdAt, {
                addSuffix: true,
                locale: es,
              })}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent className="flex justify-center items-end">
          <Badge className="rounded-full" variant="outline">
            <Text>{ticket.status}</Text>
          </Badge>
          <Text className="font-semibold">
            $ {formatCurrency(ticket.total)}
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}
