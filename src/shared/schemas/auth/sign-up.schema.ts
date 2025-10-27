import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string({ error: "El nombre es obligatorio" })
    .min(1, "El nombre es obligatorio"),
  lastName: z
    .string({ error: "El apellido es obligatorio" })
    .min(1, "El apellido es obligatorio"),
  email: z
    .string({ error: "El correo electrónico es obligatorio" })
    .min(1, "El correo electrónico es obligatorio")
    .email("Debe proporcionar un correo electrónico válido"),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  phone: z
    .string({ error: "El teléfono debe ser una cadena de texto" })
    .optional()
    .nullable(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
