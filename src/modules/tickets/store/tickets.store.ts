import { create } from "zustand";

export type TicketItemStore = {
  quantity: number;
  salePrice: number;
  readonly imageUrl: string | null;
  readonly id: string;
  readonly name: string;
  readonly originalSalePrice: number;
  readonly barcode: string;
  readonly productId: string | null;
  readonly wholeSalePrice: number;
  readonly stock: number;
};

export interface TicketStore {
  currentTicketId: string;
  tickets: Map<string, TicketItemStore[]>;
}

interface TicketStoreActions {
  createTicket: (ticketId: string) => void;
  addTicketItem: (item: TicketItemStore, ticketId?: string) => void;
  removeTicketItem: (ticketId: string, itemId: string) => void;
  changeItemQuantity: (
    ticketId: string,
    itemId: string,
    quantity: number
  ) => void;
  changeItemsSalePrice: (
    ticketId: string,
    itemId: string,
    salePrice: number
  ) => void;
  changeCurrentTicket: (ticketId: string) => void;
  clearTicket: (ticketId?: string) => void;
  removeTicket: (ticketId?: string) => void;
  renameTicket: (ticketId: string, newName: string) => void;
}

export const useTicketsStore = create<TicketStore & TicketStoreActions>()(
  (set) => ({
    currentTicketId: "ticket-1",
    tickets: new Map<string, TicketItemStore[]>([["ticket-1", []]]),

    createTicket: (ticketId) => {
      set((state) => {
        if (ticketId.trim().length > 50) return state;

        const newMap = new Map(state.tickets);
        newMap.set(ticketId.trim(), []);
        return { tickets: newMap };
      });
    },

    addTicketItem: (item, ticketId) => {
      set((state) => {
        const id = ticketId ?? state.currentTicketId;

        const items = state.tickets.get(id);
        if (!items) return state;

        const newMap = new Map(state.tickets);

        if (items.some((i) => i.id === item.id)) {
          const newItems = items.map((i) => {
            if (i.id === item.id) {
              if (i.stock - i.quantity - 1 < 0) return i;

              //TODO: allow negative stock
              return {
                ...i,
                quantity: i.quantity + 1,
              };
            }
            return i;
          });

          newMap.set(id, newItems); // array inmutable
          return { tickets: newMap };
        }

        newMap.set(id, [...items, item]);
        return { tickets: newMap };
      });
    },

    removeTicketItem: (ticketId, itemId) => {
      set((state) => {
        const items = state.tickets.get(ticketId);
        if (!items) return state;

        const newItems = items.filter((item) => item.id !== itemId);

        const newMap = new Map(state.tickets);
        newMap.set(ticketId, newItems);

        return { tickets: newMap };
      });
    },

    changeItemQuantity: (ticketId, itemId, quantity) => {
      set((state) => {
        if (quantity <= 0) return state;

        const items = state.tickets.get(ticketId);
        if (!items) return state;

        const newItems = items.map((item) => {
          if (item.id === itemId) {
            if (item.stock - quantity < 0)
              return {
                ...item,
                currentStock: 0,
                quantity: item.stock,
              };

            return {
              ...item,
              quantity,
            };
          }
          return item;
        });

        const newMap = new Map(state.tickets);
        newMap.set(ticketId, newItems);
        return { tickets: newMap };
      });
    },

    changeItemsSalePrice: (ticketId, itemId, salePrice) => {
      set((state) => {
        if (salePrice < 0) return state;

        const items = state.tickets.get(ticketId);
        if (!items) return state;

        const newItems = items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              salePrice,
            };
          }
          return item;
        });

        const newMap = new Map(state.tickets);
        newMap.set(ticketId, newItems);
        return { tickets: newMap };
      });
    },

    changeCurrentTicket: (ticketId) => {
      set((state) => {
        const existingTicket = state.tickets.get(state.currentTicketId);
        if (!existingTicket) return state;

        return {
          currentTicketId: ticketId,
        };
      });
    },

    clearTicket: (ticketId) => {
      set((state) => {
        const id = ticketId ?? state.currentTicketId;
        const newMap = new Map(state.tickets);
        newMap.set(id, []);
        return { tickets: newMap };
      });
    },

    removeTicket: (ticketId) => {
      set((state) => {
        const id = ticketId ?? state.currentTicketId;

        const newMap = new Map(state.tickets);
        newMap.delete(id);

        if (newMap.size === 0)
          return {
            currentTicketId: "ticket-1",
            tickets: new Map([["ticket-1", []]]),
          };

        if (id !== state.currentTicketId)
          return {
            tickets: newMap,
          };

        const newCurrentTicketId = Array.from(newMap.keys())[0];

        return { tickets: newMap, currentTicketId: newCurrentTicketId };
      });
    },

    renameTicket: (ticketId, newName) => {
      set((state) => {
        const newMap = new Map(state.tickets);
        const items = newMap.get(ticketId) ?? [];
        newMap.set(newName, items);
        newMap.delete(ticketId);

        if (ticketId === state.currentTicketId)
          return { tickets: newMap, currentTicketId: newName };

        return { tickets: newMap };
      });
    },
  })
);
