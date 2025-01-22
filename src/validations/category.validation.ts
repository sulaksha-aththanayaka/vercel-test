import { z } from "zod";

export const categoryGeneralSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  metaTagTitle: z.string().optional(),
  metaTagDescription: z.string().optional(),
  metaTagKeywords: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export const categoryDataSchema = z.object({
  parent: z.string().optional(),
  filters: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
  stores: z.string().optional(),
  top: z.boolean().optional(),
  status: z.boolean().optional(),
  image: z.string().optional(),
});

export const categorySeoSchema = z.object({
  stores: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const categoryDesignSchema = z.object({
  stores: z.string().optional(),
  layoutOverride: z.string().optional(),
});

// Full schema for category creation
export const categorySchema = z.object({
  general: categoryGeneralSchema,
  data: categoryDataSchema,
  seo: categorySeoSchema,
  design: categoryDesignSchema,
});

export type CreateCategoryInput = z.infer<typeof categorySchema>;

// Full schema for category update
export const categoryUpdateSchema = z.object({
  id: z
    .string({
      required_error: "ID is required",
    })
    .min(1, "ID is required"),
  general: categoryGeneralSchema.partial(), // Allow partial updates
  data: categoryDataSchema.partial(),
  seo: categorySeoSchema.partial(),
  design: categoryDesignSchema.partial(),
});

export type UpdateCategoryInput = z.infer<typeof categoryUpdateSchema>;

// Schema for category deletion
export const categoryDeleteSchema = z.object({
  id: z
    .string({
      required_error: "ID is required",
    })
    .min(1, "ID is required"),
});

export type DeleteCategoryInput = z.infer<typeof categoryDeleteSchema>;
