import { z } from "zod";

export const filterSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  sortOrder: z.number().int().nonnegative("Sort order must be a non-negative integer").optional(),
  values: z
    .array(
      z.object({
        name: z.string().min(1, "Value name is required"),
        sortOrder: z.number().int().nonnegative("Sort order must be a non-negative integer"),
      })
    )
    .min(1, "At least one value is required"),
});

export type FilterCreateInput = z.infer<typeof filterSchema>;

export const filterUpdateSchema = filterSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type FilterUpdateInput = z.infer<typeof filterUpdateSchema>;

export const filterDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type DeleteFilterInput = z.infer<typeof filterDeleteSchema>;
