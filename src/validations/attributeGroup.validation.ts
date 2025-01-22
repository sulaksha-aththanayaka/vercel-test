import { z } from "zod";

export const attributeGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sortOrder: z
    .number()
    .int()
    .nonnegative("Sort order must be a non-negative integer")
    .optional(), 
  isDeleted: z.boolean().optional(), 
});

export type CreateAttributeGroupInput = z.infer<typeof attributeGroupSchema>;

export const attributeGroupUpdateSchema = attributeGroupSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateAttributeGroupInput = z.infer<typeof attributeGroupUpdateSchema>;

export const attributeGroupDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type DeleteAttributeGroupInput = z.infer<typeof attributeGroupDeleteSchema>;
