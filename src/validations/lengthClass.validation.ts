import { z } from "zod";
export const lengthClassSchema = z.object({
  title: z.string().min(1, "Title is required"),
  unit: z.number().positive("Unit must be a positive number"),
  value: z.number().nonnegative("Value must be a non-negative number"),
});

export type LengthClassCreateInput = z.infer<typeof lengthClassSchema>;

export const lengthClassUpdateSchema = lengthClassSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type LengthClassUpdateInput = z.infer<typeof lengthClassUpdateSchema>;

export const lengthClassDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type LengthClassDeleteInput = z.infer<typeof lengthClassDeleteSchema>;
