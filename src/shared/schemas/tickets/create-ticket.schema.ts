import { TICKET_STATUSES } from "@/shared/entities/tickets.entity";
import { z } from "zod";

export const createTicketItemSchema = z.object({
  name: z
    .string({ message: "El nombre debe ser una cadena de texto" })
    .min(1, { message: "El nombre no puede estar vacío" })
    .max(200, { message: "El nombre no puede exceder los 200 caracteres" }),

  barcode: z
    .string({ message: "El código de barras debe ser una cadena de texto" })
    .min(1, { message: "El código de barras no puede estar vacío" })
    .max(100, {
      message: "El código de barras no puede exceder los 100 caracteres",
    }),

  salePrice: z
    .number({ message: "El precio de venta debe ser un número" })
    .positive({ message: "El precio de venta debe ser mayor a 0" }),

  quantity: z
    .number({ message: "La cantidad debe ser un número" })
    .positive({ message: "La cantidad debe ser mayor a 0" })
    .min(1, { message: "La cantidad mínima es 1" }),

  productId: z
    .string({ message: "El ID del producto debe ser una cadena de texto" })
    .nullable()
    .optional(),
});

export const createTicketSchema = z.object({
  status: z
    .enum(TICKET_STATUSES, {
      message: "El estado debe ser pending, completed o canceled",
    })
    .optional(),

  items: z
    .array(createTicketItemSchema, {
      message: "Los items deben ser un arreglo",
    })
    .min(1, { message: "Debe incluir al menos un item en el ticket" }),
});

export type CreateTicketItemSchema = z.infer<typeof createTicketItemSchema>;
export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
