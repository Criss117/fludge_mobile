import { z } from "zod";
import { createGroupSchema } from "./create-group.schema";

export const updateGroupSchema = createGroupSchema.partial().omit({
  permissions: true,
  isDefault: true,
});

export type UpdateGroupSchema = z.infer<typeof updateGroupSchema>;
