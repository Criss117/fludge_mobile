import { allPermission, Permission } from "@/shared/entities/permissions";
import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string({ message: "El nombre debe ser una cadena de texto" })
    .min(1, { message: "El nombre es obligatorio" }),

  description: z
    .string({ message: "La descripción debe ser una cadena de texto" })
    .optional()
    .nullable(),

  isDefault: z
    .boolean({ message: "El valor por defecto debe ser verdadero o falso" })
    .optional(),

  permissions: z
    .array(
      z.enum(allPermission as [Permission, ...Permission[]], {
        message: "Cada permiso debe ser un valor válido",
      })
    )
    .min(1, { message: "Los permisos son obligatorios" }),
});

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
