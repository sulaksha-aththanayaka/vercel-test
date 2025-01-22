import mongoose, { Schema } from "mongoose";
import { IMarketing } from "../types/marketing.type";

const MarketingSchema: Schema<IMarketing> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    trackingCode: { type: String, required: true },
    example: { type: [String]},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IMarketing>("Marketing", MarketingSchema);
