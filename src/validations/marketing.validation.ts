import { z } from "zod";

export const marketingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(), 
  trackingCode: z.string().min(1, "Tracking Code is required"), 
  example: z.array(z.string()).optional(),
  isDeleted: z.boolean().optional(),
});

export type CreateMarketingInput = z.infer<typeof marketingSchema>;

export const marketingUpdateSchema = marketingSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateMarketingInput = z.infer<typeof marketingUpdateSchema>;

export const marketingDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type DeleteMarketingInput = z.infer<typeof marketingDeleteSchema>;
