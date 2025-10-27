import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({ error: "El correo electrónico es obligatorio" })
    .min(1, "El correo electrónico es obligatorio"),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
