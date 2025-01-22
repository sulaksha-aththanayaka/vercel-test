import mongoose, { Schema } from "mongoose";
import { IAttribute } from "../types/attribute.type";

const AttributeSchema: Schema<IAttribute> = new Schema(
  {
    name: { type: String, required: true },
    sortOrder: { type: Number, default:0 },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "AttributeGroup", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IAttribute>("Attribute", AttributeSchema);
