import { z } from "zod";
import { signUpSchema } from "../auth/sign-up.schema";

export const createEmployeeSchema = signUpSchema.extend({
  salary: z.coerce
    .number({ message: "El salario debe ser un número" })
    .positive({
      error: "El salario debe ser positivo",
    }),
  groupIds: z
    .array(z.uuid({ message: "Cada grupo debe ser un valor válido" }))
    .optional(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
