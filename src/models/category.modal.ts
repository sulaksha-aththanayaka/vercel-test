import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/category.type";

// Sub-schema for "general" details
const GeneralSchema: Schema = new Schema({
  name: { type: String, required: true },
  metaTagTitle: { type: String },
  metaTagDescription: { type: String },
  metaTagKeywords: { type: [String], default: [] },
  description: { type: String },
});

// Sub-schema for "data" details
const DataSchema: Schema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: "Category", default: null }, // References another category
  filters: { type: [String], default: [] },
  columns: { type: [String], default: [] },
  sortOrder: { type: Number, default: 0 },
  stores: { type: String, default: "" },
  top: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  image: { type: String, required: true },
});

// Sub-schema for "seo" details
const SeoSchema: Schema = new Schema({
  stores: { type: String, default: "" },
  keywords: { type: [String], default: [] },
});

// Sub-schema for "design" details
const DesignSchema: Schema = new Schema({
  stores: { type: String, default: "" },
  layoutOverride: { type: String, default: "" },
});

const CategorySchema: Schema<ICategory> = new Schema(
  {
    general: { type: GeneralSchema, required: true },
    data: { type: DataSchema, required: true },
    seo: { type: SeoSchema, default: () => ({}) },
    design: { type: DesignSchema, default: () => ({}) },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
