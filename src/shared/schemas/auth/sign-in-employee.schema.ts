import { z } from "zod";

export const signInEmployeeSchema = z.object({
  username: z
    .string({ error: "El nombre de usuario es obligatorio" })
    .min(1, "El nombre de usuario es obligatorio"),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria"),
});

export type SignInEmployeeSchema = z.infer<typeof signInEmployeeSchema>;
