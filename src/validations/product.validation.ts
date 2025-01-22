import { z } from "zod";

// Define the Zod schema for creating a product
export const productSchema = z.object({
  general: z.object({
    name: z.string().min(1, "Name is required"),
    metaTagTitle: z.string().min(1, "Meta Tag Title is required"),
    metaTagDescription: z.string().optional(),
    metaTagKeyWords: z.array(z.string()).optional(),
    productTags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
  data: z.object({
    model: z.object({
      model: z.string().min(1, "Model is required"),
      location: z.string().optional(),
      sku: z.number().optional(),
      upc: z.string().optional(),
      isbn: z.number().optional(),
      jan: z.number().optional(),
      ean: z.number().optional(),
      mpn: z.number().optional(),
    }),
    price: z.object({
      prince: z.number().min(0, "Price must be a positive number").optional(),
      taxClass: z.string().optional(),
    }).optional(),
    stock: z.object({
      qty: z.number().int().nonnegative().optional(),
      minQty: z.number().int().nonnegative().optional(),
      substrackStock: z.boolean().optional(),
      outOfStockStatus: z.string().optional(),
      dateAvailable: z.string().date().optional(),
    }).optional(),
    specification: z.object({
      dimentions: z.object({
        length: z.number().nonnegative().optional(),
        width: z.number().nonnegative().optional(),
        height: z.number().nonnegative().optional(),
        weight: z.number().nonnegative().optional(),
        weightClass: z.number().optional(),
        lengthClass: z.number().optional(),
      }).optional(),
      requiresShipping: z.boolean(),
      status: z.boolean(),
    }).optional(),
  }),
  links: z.object({
    manufacturer: z.string().optional(),
    categories: z.array(z.string()).optional(),
    filters: z.array(z.string()).optional(),
    stores: z.number().optional(),
    downloads: z.number().optional(),
    relatedProducts: z.array(z.string()).optional(),
  }).optional(),
  attribute: z.array(
    z.object({
      attribute: z.string().optional(),
      text: z.string().optional(),
    })
  ).optional(),
  options: z.array(
    z.object({
      type: z.string().optional(),
      required: z.boolean().optional(),
      value: z.any().optional(),
    })
  ).optional(),
  subscriptions: z.array(
    z.object({
      plan: z.string().optional(),
      customerGroup: z.string().optional(),
      totalPrice: z.number().optional(),
      price: z.number().optional(),
    })
  ).optional(),
  discounts: z.array(
    z.object({
      customerGroup: z.string().optional(),
      qty: z.number().int().optional(),
      priority: z.union([z.number(), z.string()]).optional(),
      price: z.number().optional(),
      dateStart: z.string().date().optional(),
      dateEnd: z.string().date().optional(),
    })
  ).optional(),
  specials: z.array(
    z.object({
      customerGroup: z.string().optional(),
      priority: z.union([z.number(), z.string()]).optional(),
      price: z.number().optional(),
      dateStart: z.string().date().optional(),
      dateEnd: z.string().date().optional(),
    })
  ).optional(),
  images: z.array(
    z.object({
      image: z.string().optional(),
      sortOrder: z.union([z.number(), z.string()]).optional(),
    })
  ).optional(),
  rewardPoints: z.object({
    points: z.string().optional(),
    rewardPoints: z.array(
      z.object({
        customerGroup: z.string().optional(),
        points: z.string().optional(),
      })
    ).optional(),
  }).optional(),
  seos: z.array(
    z.object({
      stores: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
  ).optional(),
  designs: z.array(
    z.object({
      stores: z.string().optional(),
      layoutOveride: z.string().optional(),
    })
  ).optional(),
  isDeleted: z.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof productSchema>;

export const productUpdateSchema = productSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateProductInput = z.infer<typeof productUpdateSchema>;

export const productDeleteSchema = z.object({
  id: z.string().min(1, "required"),
});

export type DeleteProductInput = z.infer<typeof productDeleteSchema>;
