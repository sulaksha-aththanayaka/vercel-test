import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product.type";

const GeneralSchema = new Schema({
  name: { type: String, required: true },
  metaTagTitle: { type: String, required: true },
  metaTagDescription: { type: String },
  metaTagKeyWords: { type: [String] },
  productTags: { type: [String] },
  description: { type: String },
});

const ModelSchema = new Schema({
  model: { type: String, required: true },
  location: { type: String },
  sku: { type: Number },
  upc: { type: String },
  isbn: { type: Number },
  jan: { type: Number },
  ean: { type: Number },
  mpn: { type: Number },
});

const PriceSchema = new Schema({
  prince: { type: Number },
  taxClass: { type: String },
});

const StockSchema = new Schema({
  qty: { type: Number },
  minQty: { type: Number },
  substrackStock: { type: Boolean },
  outOfStockStatus: { type: String },
  dateAvailable: { type: Date },
});

const DimensionsSchema = new Schema({
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  weightClass: { type: Number },
  lengthClass: { type: Number },
});

const SpecificationSchema = new Schema({
  dimentions: DimensionsSchema,
  requiresShipping: { type: Boolean, required: true },
  status: { type: Boolean, required: true },
});

const DataSchema = new Schema({
  model: ModelSchema,
  price: PriceSchema,
  stock: StockSchema,
  specification: SpecificationSchema,
});

const LinksSchema = new Schema({
  manufacturer: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  filters: { type: [String] },
  stores: { type: Number },
  downloads: { type: Number },
  relatedProducts: { type: [String] },
});

const RewardPointsSchema = new Schema({
  points: { type: String },
  rewardPoints: [
    {
      customerGroup: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerGroup" },
      points: { type: String },
    },
  ],
});

const SEOSchema = new Schema({
  stores: { type: String },
  keywords: { type: [String] },
});

const DesignSchema = new Schema({
  stores: { type: String },
  layoutOveride: { type: String },
});

const ProductSchema: Schema<IProduct> = new Schema(
  {
    general: GeneralSchema,
    data: DataSchema,
    links: LinksSchema,
    attribute: [
      {
        attribute: { type: String },
        text: { type: String },
      },
    ],
    options: [
      {
        type: { type: String },
        required: { type: Boolean },
        value: { type: Schema.Types.Mixed },
      },
    ],
    subscriptions: [
      {
        plan: { type: String },
        customerGroup: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerGroup" },
        totalPrice: { type: Number },
        price: { type: Number },
      },
    ],
    discounts: [
      {
        customerGroup: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerGroup" },
        qty: { type: Number },
        priority: { type: Schema.Types.Mixed },
        price: { type: Number },
        dateStart: { type: Date },
        dateEnd: { type: Date },
      },
    ],
    specials: [
      {
        customerGroup: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerGroup" },
        priority: { type: Schema.Types.Mixed },
        price: { type: Number },
        dateStart: { type: Date },
        dateEnd: { type: Date },
      },
    ],
    images: [
      {
        image: { type: String },
        sortOrder: { type: Schema.Types.Mixed, default: 0 },
      },
    ],
    rewardPoints: RewardPointsSchema,
    seos: [SEOSchema],
    designs: [DesignSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
