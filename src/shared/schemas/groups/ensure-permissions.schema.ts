import { allPermission, Permission } from "@/shared/entities/permissions";
import { z } from "zod";

export const ensurePermissionsSchema = z.object({
  permissions: z
    .array(
      z.enum(allPermission as [Permission, ...Permission[]], {
        message: "Cada permiso debe ser un valor válido",
      })
    )
    .min(1, { message: "Los permisos son obligatorios" }),
});

export type EnsurePermissionsSchema = z.infer<typeof ensurePermissionsSchema>;
