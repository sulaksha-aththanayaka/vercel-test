import { z } from "zod";

export const customerGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  approveNewCustomer: z.boolean().optional(),
  description: z.string().optional(),
  sortOrder: z.number().optional(),
});

export type CreateCustomerGroupInput = z.infer<typeof customerGroupSchema>;

export const customerGrouptUpdateSchema = customerGroupSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateCustomerGroupInput = z.infer<typeof customerGrouptUpdateSchema>;

export const customerGrouptDeleteSchema = z.object({
  id: z.string().min(1, "required"),
});

export type DeleteCustomerGroupInput = z.infer<typeof customerGrouptDeleteSchema>;