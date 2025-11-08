import { z } from "zod";

export const createCategoryBaseSchema = z.object({
  name: z
    .string({ message: "El nombre debe ser una cadena de texto" })
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" }),

  description: z
    .string({ message: "La descripción debe ser una cadena de texto" })
    .max(225, {
      message: "La descripción no puede exceder los 255 caracteres",
    })
    .nullish(),
});

export const createCategorySchema = z.object({
  name: z
    .string({ message: "El nombre debe ser una cadena de texto" })
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" }),

  description: z
    .string({ message: "La descripción debe ser una cadena de texto" })
    .max(225, {
      message: "La descripción no puede exceder los 255 caracteres",
    })
    .nullish(),

  parentId: z
    .uuid({ message: "El ID del padre debe ser un UUID válido", version: "v7" })
    .nullish(),

  childrens: z
    .array(createCategoryBaseSchema, {
      message: "Los hijos deben ser un arreglo",
    })
    .optional(),
});

// Tipos TypeScript inferidos
export type CreateCategoryBaseSchema = z.infer<typeof createCategoryBaseSchema>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
