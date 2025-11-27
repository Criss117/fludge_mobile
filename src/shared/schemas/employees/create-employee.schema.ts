import { z } from "zod";
import { signUpSchema } from "../auth/sign-up.schema";

export const createEmployeeSchema = signUpSchema
  .omit({
    email: true,
  })
  .extend({
    username: z
      .string({ error: "El nombre de usuario es obligatorio" })
      .min(1, "El nombre de usuario es obligatorio"),
    salary: z.coerce
      .number<number>({ message: "El salario debe ser un número" })
      .positive({
        error: "El salario debe ser positivo",
      }),
    groupIds: z
      .array(z.uuid({ message: "Cada grupo debe ser un valor válido" }))
      .optional(),
  });

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
