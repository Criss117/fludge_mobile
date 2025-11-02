import { z } from "zod";

export const ensureGroupIdsSchema = z.object({
  groupIds: z
    .array(
      z.uuidv4({
        version: "v4",
        error: "Todos los ids deben ser válidos",
      })
    )
    .nonempty({
      error: "Debe especificar al menos un id",
    }),
});

export type EnsureGroupIdsSchema = z.infer<typeof ensureGroupIdsSchema>;
