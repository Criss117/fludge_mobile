import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";
import { Icon } from "@/modules/shared/components/ui/icon";
import { Input } from "@/modules/shared/components/ui/input";
import { Separator } from "@/modules/shared/components/ui/separator";
import { Text } from "@/modules/shared/components/ui/text";
import { cn } from "@/modules/shared/lib/utils";
import { SAVE_TICKET_TYPE } from "@/modules/tickets/hooks/use.save-ticket-with-client";
import { useSaveTicketStore } from "@/modules/tickets/store/save-ticket.store";
import { BanknoteIcon } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, TouchableWithoutFeedback, View } from "react-native";

interface SaveLikeCheckboxProps {
  isSelected: boolean;
  label: string;
  onPress: () => void;
}

const dummyClients = [
  { name: "Cristian", id: "1" },
  { name: "Maria", id: "2" },
  { name: "Juan", id: "3" },
  { name: "Pedro", id: "4" },
  { name: "Luis", id: "5" },
  { name: "Carlos", id: "6" },
  { name: "Jose", id: "7" },
  { name: "Antonio", id: "8" },
  { name: "Daniel", id: "9" },
  { name: "Fernando", id: "10" },
];

function SaveLikeCheckbox({
  isSelected,
  label,
  onPress,
}: SaveLikeCheckboxProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className={cn(
          "rounded-md flex flex-row justify-between items-center px-2 py-3",
          isSelected && "bg-primary/20"
        )}
      >
        <View className="flex flex-row items-center gap-x-2">
          <Icon as={BanknoteIcon} size={24} />
          <Text variant="large">{label}</Text>
        </View>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onPress}
          className="size-5"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export function WithClient() {
  const { clientInfo, setClientInfo } = useSaveTicketStore();

  const isPaymentNow = clientInfo.saveLike === SAVE_TICKET_TYPE.PAYMENT_NOW;
  const isCredit = clientInfo.saveLike === SAVE_TICKET_TYPE.CREDIT;

  useEffect(() => {
    return () => {
      setClientInfo({
        type: "clear:all",
      });
    };
  }, [setClientInfo]);

  return (
    <View className="flex gap-y-2">
      <Card className="py-2">
        <CardContent className="px-2 flex gap-y-2">
          <SaveLikeCheckbox
            isSelected={isPaymentNow}
            label="Pagar Ahora"
            onPress={() =>
              setClientInfo({
                type: "set:save-like:payment-now",
              })
            }
          />
          <Separator />
          <SaveLikeCheckbox
            isSelected={isCredit}
            label="A Crédito"
            onPress={() =>
              setClientInfo({
                type: "set:save-like:credit",
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selecciona un cliente</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-y-2">
          <Input placeholder="Nombre" className="w-full" />

          <FlatList
            className="max-h-40"
            data={dummyClients}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (item.id === clientInfo.client?.id) {
                    setClientInfo({
                      type: "clear:client",
                    });
                    return;
                  }

                  setClientInfo({
                    type: "set:client",
                    payload: {
                      id: item.id,
                      name: item.name,
                    },
                  });
                }}
              >
                <Card
                  className={cn(
                    "py-2",
                    item.id === clientInfo.client?.id && "bg-primary/20"
                  )}
                >
                  <CardContent className="px-3">
                    <Text>{item.name}</Text>
                  </CardContent>
                </Card>
              </TouchableWithoutFeedback>
            )}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </CardContent>
      </Card>
    </View>
  );
}
