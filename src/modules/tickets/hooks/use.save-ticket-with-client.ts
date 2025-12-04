import { useReducer } from "react";

export const SAVE_TICKET_TYPE = {
  PAYMENT_NOW: "PAYMENT_NOW",
  CREDIT: "CREDIT",
} as const;

export type SaveTicketType =
  (typeof SAVE_TICKET_TYPE)[keyof typeof SAVE_TICKET_TYPE];

export type ClientInfo = {
  name: string;
  id: string;
};

export type WhitClientState = {
  saveLike: SaveTicketType;
  client: ClientInfo | null;
};

export type WithClientActions =
  | { type: "set:save-like:payment-now" }
  | { type: "set:save-like:credit" }
  | { type: "set:client"; payload: ClientInfo }
  | { type: "clear:client" }
  | { type: "clear:all" };

function reducer(
  state: WhitClientState,
  action: WithClientActions
): WhitClientState {
  switch (action.type) {
    case "set:save-like:payment-now":
      return {
        ...state,
        saveLike: SAVE_TICKET_TYPE.PAYMENT_NOW,
      };
    case "set:save-like:credit":
      return {
        ...state,
        saveLike: SAVE_TICKET_TYPE.CREDIT,
      };
    case "set:client":
      return {
        ...state,
        client: action.payload,
      };
    case "clear:client":
      return {
        ...state,
        client: null,
      };
    case "clear:all":
      return {
        client: null,
        saveLike: SAVE_TICKET_TYPE.PAYMENT_NOW,
      };
    default:
      return state;
  }
}

export function useSaveTicketWithClient() {
  return useReducer(reducer, {
    saveLike: SAVE_TICKET_TYPE.PAYMENT_NOW,
    client: null,
  });
}
