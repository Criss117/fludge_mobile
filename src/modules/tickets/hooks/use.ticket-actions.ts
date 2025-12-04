import { useCallback } from "react";
import { useTicketsStore } from "../store/tickets.store";

interface Props {
  itemId: string;
}

export function useTicketActions({ itemId }: Props) {
  const currentTicketId = useTicketsStore((state) => state.currentTicketId);
  const removeTicketItem = useTicketsStore((state) => state.removeTicketItem);
  const changeItemQuantity = useTicketsStore(
    (state) => state.changeItemQuantity
  );

  const setItemQuantity = useCallback(
    (quantity: string) => {
      if (quantity === "") {
        changeItemQuantity(currentTicketId, itemId, 0);
        return;
      }

      const quantityNumber = Number.parseInt(quantity);
      if (isNaN(quantityNumber)) return;

      changeItemQuantity(currentTicketId, itemId, quantityNumber);
    },
    [currentTicketId, itemId, changeItemQuantity]
  );

  const increaseItemQuantity = useCallback(
    (quantity: number) =>
      changeItemQuantity(currentTicketId, itemId, quantity + 1),
    [currentTicketId, changeItemQuantity, itemId]
  );

  const decreaseItemQuantity = useCallback(
    (quantity: number) =>
      changeItemQuantity(currentTicketId, itemId, quantity - 1),
    [currentTicketId, changeItemQuantity, itemId]
  );

  const removeItem = useCallback(() => {
    removeTicketItem(currentTicketId, itemId);
  }, [currentTicketId, itemId, removeTicketItem]);

  return {
    removeItem,
    setItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
  };
}
