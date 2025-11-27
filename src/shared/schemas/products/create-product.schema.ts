import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({
      message: "El nombre del producto no puede estar vacío",
    })
    .min(1, {
      message: "El nombre del producto no puede estar vacío",
    })
    .max(100, {
      message: "El nombre del producto no puede tener mas de 100 caracteres",
    })
    .transform((val) => val?.trim()),

  barcode: z
    .string({
      message: "El código de barras del producto no puede estar vacío",
    })
    .min(1, {
      message: "El código de barras del producto no puede estar vacío",
    })
    .max(225, {
      message:
        "El código de barras del producto no puede tener mas de 225 caracteres",
    })
    .transform((val) => val?.trim()),

  purchasePrice: z.coerce
    .number<number>({
      message: "El precio de compra debe ser un número entero",
    })
    .int({
      message: "El precio de compra debe ser un número entero",
    })
    .min(1, { message: "El precio de compra debe ser mayor a 0" }),

  salePrice: z.coerce
    .number<number>({
      message: "El precio de venta debe ser un número entero",
    })
    .int({
      message: "El precio de venta debe ser un número entero",
    })
    .min(1, { message: "El precio de venta debe ser mayor a 0" }),

  wholesalePrice: z.coerce
    .number<number>({
      message: "El precio mayorista debe ser un número entero",
    })
    .int({
      message: "El precio mayorista debe ser un número entero",
    })
    .min(1, { message: "El precio mayorista debe ser mayor a 0" }),

  stock: z.coerce
    .number<number>({
      message: "El stock debe ser un número entero",
    })
    .int({
      message: "El stock debe ser un número entero",
    })
    .min(1, { message: "El stock debe ser mayor a 0" }),

  minStock: z.coerce
    .number<number>({
      message: "El stock mínimo debe ser un número entero",
    })
    .int({
      message: "El stock mínimo debe ser un número entero",
    })
    .min(1, { message: "El stock mínimo debe ser mayor a 0" }),

  description: z
    .string({
      message: "La imagen del producto debe de ser una cadena de caracteres",
    })
    .max(225, {
      message: "La imagen del producto no puede tener mas de 225 caracteres",
    })
    .transform((val) => val?.trim())
    .optional()
    .nullable(),

  categoryId: z
    .uuid({
      message: "La categoría del producto debe de ser un uuid válido",
      version: "v7",
    })
    .transform((val) => val?.trim())
    .optional()
    .nullable(),

  offerPrice: z.coerce
    .number<number>({
      message: "El precio de oferta debe de ser un número entero",
    })
    .int({
      message: "El precio de oferta debe de ser un número entero",
    })
    .min(1, { message: "El precio de oferta debe ser mayor a 0" })
    .optional()
    .nullable(),

  allowNegativeStock: z.boolean(),
});

// Tipo TypeScript inferido
export type CreateProductSchema = z.infer<typeof createProductSchema>;
