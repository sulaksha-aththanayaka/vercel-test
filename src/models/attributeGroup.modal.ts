import mongoose, { Schema } from "mongoose";
import { IAttributeGroup } from "../types/attributeGroup.type";

const AttributeGroupSchema: Schema<IAttributeGroup> = new Schema(
  {
    name: { type: String, required: true },
    sortOrder: { type: Number, default:0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IAttributeGroup>(
  "AttributeGroup",
  AttributeGroupSchema
);
