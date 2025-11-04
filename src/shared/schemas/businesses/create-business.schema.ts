import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z
    .string({ error: "El nombre debe ser una cadena de texto" })
    .min(1, { error: "El nombre es obligatorio" })
    .transform((value) => value?.trim()),

  nit: z
    .string({ error: "El NIT debe ser una cadena de texto" })
    .min(1, { error: "El NIT es obligatorio" })
    .transform((value) => value?.trim()),

  email: z
    .email({ error: "Debe proporcionar un correo electrónico válido" })
    .transform((value) => value?.trim()),
  phone: z
    .string({ error: "El teléfono debe ser una cadena de texto" })
    .transform((value) => value?.trim()),

  legalName: z
    .string({ error: "La razón social debe ser una cadena de texto" })
    .transform((value) => value?.trim()),
  address: z
    .string({ error: "La dirección debe ser una cadena de texto" })
    .transform((value) => value?.trim())
    .nullish(),
});

export type CreateBusinessSchema = z.infer<typeof createBusinessSchema>;
