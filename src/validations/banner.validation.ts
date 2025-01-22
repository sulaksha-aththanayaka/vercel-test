import { z } from "zod";

const bannerImageSchema = z.object({
  title: z.string().min(1, "Image title is required"),
  image: z.string().url("Image must be a valid URL").optional(),
  link: z.string().url("Link must be a valid URL").min(1, "Image link is required"),
  sortOrder: z.number().int().nonnegative("Sort order must be a non-negative integer").optional(),
});

export const bannerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isDeleted: z.boolean().optional(), // Soft delete flag
  bannerImages: z
    .array(bannerImageSchema)
    .min(1, "At least one banner image is required"), // Enforce at least one image
});

export type CreateBannerInput = z.infer<typeof bannerSchema>;

export const bannerUpdateSchema = bannerSchema.extend({
  id: z.string().min(1, "ID is required"),
});

export type UpdateBannerInput = z.infer<typeof bannerUpdateSchema>;

export const bannerDeleteSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type DeleteBannerInput = z.infer<typeof bannerDeleteSchema>;

export const bannerStatusChangeSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type BannerStatusChange = z.infer<typeof bannerStatusChangeSchema>;


