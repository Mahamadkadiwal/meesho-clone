import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category is required"),
  parentId: z.string().nullable().optional().default(null),
  isActive: z.boolean().default(true).optional(),
});

export type CategoryFormInput = z.infer<typeof categorySchema>;
