import { createContext, PropsWithChildren, use, useState } from "react";
import {
  useSaveTicketWithClient,
  type WhitClientState,
  type WithClientActions,
} from "../hooks/use.save-ticket-with-client";

export const PAYMENT_TYPE = {
  WITH_CLIENT: "WITH_CLIENT",
  WITHOUT_CLIENT: "WITHOUT_CLIENT",
} as const;

export type PaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

interface Context {
  paymentType: PaymentType;
  clientInfo: WhitClientState;
  setClientInfo: React.ActionDispatch<[action: WithClientActions]>;
  setPaymentType: (paymentType: PaymentType) => void;
}

const SaveTicketContext = createContext<Context | null>(null);

export function useSaveTicketStore() {
  const context = use(SaveTicketContext);

  if (!context) {
    throw new Error(
      "useSaveTicketStore must be used within a SaveTicketProvider"
    );
  }

  return context;
}

export function SaveTicketProvider({ children }: PropsWithChildren) {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PAYMENT_TYPE.WITHOUT_CLIENT
  );
  const [clientInfo, setClientInfo] = useSaveTicketWithClient();

  return (
    <SaveTicketContext.Provider
      value={{
        paymentType,
        clientInfo,
        setClientInfo,
        setPaymentType,
      }}
    >
      {children}
    </SaveTicketContext.Provider>
  );
}
