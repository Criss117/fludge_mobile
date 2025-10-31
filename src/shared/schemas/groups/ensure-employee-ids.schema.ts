import { z } from "zod";

export const ensureEmployeeIdsSchema = z.object({
  employeeIds: z
    .array(
      z.string({
        message: "Cada empleado debe ser un valor válido",
      })
    )
    .min(1, { message: "Los empleados son obligatorios" }),
});

export type EnsureEmployeeIdsSchema = z.infer<typeof ensureEmployeeIdsSchema>;
