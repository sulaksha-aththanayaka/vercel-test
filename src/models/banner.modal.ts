import mongoose, { Schema } from "mongoose";
import { IBanner } from "../types/banner.type";

const BannerImageSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  link: { type: String, required: true },
  sortOrder: { type: Number }
});

const BannerSchema: Schema<IBanner> = new Schema(
  {
    name: { type: String, required: true },
    bannerImages: { type: [BannerImageSchema], required: true },
    status: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IBanner>("Banner", BannerSchema);
