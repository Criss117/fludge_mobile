import { z } from "zod";

export const productCursorSchema = z.object({
  lastCreatedAt: z.date(),
  lastProductId: z.string(),
});

export type ProductCursor = z.infer<typeof productCursorSchema>;
