import { Button } from "@/modules/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/shared/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/shared/components/ui/tabs";
import { Text } from "@/modules/shared/components/ui/text";
import {
  PAYMENT_TYPE,
  type PaymentType,
  SaveTicketProvider,
  useSaveTicketStore,
} from "@/modules/tickets/store/save-ticket.store";
import type { TicketItemStore } from "@/modules/tickets/store/tickets.store";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { WithClient } from "./with-client";
import { WithoutClient } from "./without-client";

interface Props {
  items: TicketItemStore[];
}

function Content() {
  const { paymentType, setPaymentType } = useSaveTicketStore();

  return (
    <Tabs
      value={paymentType}
      onValueChange={(v) => setPaymentType(v as PaymentType)}
    >
      <TabsList className="w-full rounded-full">
        <TabsTrigger
          value={PAYMENT_TYPE.WITHOUT_CLIENT}
          className="flex-1 rounded-full"
        >
          <Text>Sin Cliente</Text>
        </TabsTrigger>
        <TabsTrigger
          value={PAYMENT_TYPE.WITH_CLIENT}
          className="flex-1 rounded-full"
        >
          <Text>Con Cliente</Text>
        </TabsTrigger>
      </TabsList>

      <TabsContent value={PAYMENT_TYPE.WITHOUT_CLIENT}>
        <WithoutClient />
      </TabsContent>
      <TabsContent value={PAYMENT_TYPE.WITH_CLIENT}>
        <WithClient />
      </TabsContent>
    </Tabs>
  );
}

export function SaveTicketItemCard({ items }: Props) {
  const { width } = useSafeAreaFrame();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>Guardar</Text>
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          width: width - 32,
        }}
      >
        <DialogHeader>
          <DialogTitle>Guardar Ticket</DialogTitle>
        </DialogHeader>

        <SaveTicketProvider>
          <Content />
        </SaveTicketProvider>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          <Button>
            <Text>Guardar</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
