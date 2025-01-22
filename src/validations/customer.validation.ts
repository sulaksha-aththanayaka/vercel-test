import { z } from "zod";

export const customerSchema = z.object({
    general: z.object({
      details: z.object({
        customerGroup: z.string().optional(),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Email must be valid"),
        telephone: z.string().optional(),
      }),
      others: z.object({
        newsLetter: z.boolean().optional(),
        safe: z.boolean().optional(),
        status: z.boolean().optional(),
      }).optional(),
    }),
    addresses: z
      .array(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          company: z.string().optional(),
          address1: z.string().min(1, "Address1 name is required"),
          address2: z.string().optional(),
          city: z.string().min(1, "City name is required"),
          postCode: z.string(),
          country: z.string().min(1, "Country name is required"),
          region: z.string().min(1, "Region name is required"),
          default: z.boolean().optional(),
        })
      )
      .optional(),
    histories: z
      .array(
        z.object({
          dateAdded: z.date().optional(),
          comment: z.string(),
        })
      )
      .optional(),
    transactions: z
      .array(
        z.object({
          description: z.string(),
          amount: z.number(),
        })
      )
      .optional(),
    rewardPoints: z
      .array(
        z.object({
          description: z.string(),
          points: z.number(),
        })
      )
      .optional(),
  });
  

export type CreateCustomerInput = z.infer<typeof customerSchema>;

export const customerUpdateSchema = customerSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateCustomerInput = z.infer<typeof customerUpdateSchema>;

export const customerDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type DeleteCustomerInput = z.infer<typeof customerDeleteSchema>;
