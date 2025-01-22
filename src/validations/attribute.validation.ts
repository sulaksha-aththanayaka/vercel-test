import { z } from "zod";

export const attributeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    sortOrder: z.number().int().nonnegative("Sort order must be a non-negative integer").optional(),
    group: z.string().min(1, "Group is required"),
  });
  
  export type CreateAttributeInput = z.infer<typeof attributeSchema>;
  
  export const attributeUpdateSchema = attributeSchema.extend({
    id: z.string().min(1, "ID is required"),
  });
  
  export type UpdateAttributeInput = z.infer<typeof attributeUpdateSchema>;
  
  export const attributeDeleteSchema = z.object({
    id: z.string().min(1, "ID is required"),
  });
  
  export type DeleteAttributeInput = z.infer<typeof attributeDeleteSchema>;