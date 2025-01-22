import mongoose, { Schema } from "mongoose";
import { ICustomerGroup } from "../types/customerGroup.type";

const CustomerGroupSchema: Schema<ICustomerGroup> = new Schema(
  {
    name: { type: String, required: true },
    approveNewCustomer: { type: Boolean, required: true },
    description: { type: String },
    sortOrder: { type: Number },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomerGroup>(
  "CustomerGroup",
  CustomerGroupSchema
);
