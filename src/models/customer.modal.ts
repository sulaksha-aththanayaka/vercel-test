import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../types/customer.type";

const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    general: {
      details: {
        customerGroup:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CustomerGroup'
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: String },
      },
      others: {
        newsLetter: { type: Boolean, default: false },
        safe: { type: Boolean, default: false },
        status: { type: Boolean, default: true },
      },
    },
    addresses: [
      {
        firstName: { type: String},
        lastName: { type: String},
        company: { type: String, default: "" },
        address1: { type: String},
        address2: { type: String, default: "" },
        city: { type: String},
        postCode: { type: String},
        country: { type: String},
        region: { type: String},
        default: { type: Boolean, default: false },
      },
    ],
    histories: [
      {
        dateAdded: { type: Date, default: Date.now },
        comment: { type: String},
      },
    ],
    transactions: [
      {
        description: { type: String},
        amount: { type: Number},
      },
    ],
    rewardPoints: [
      {
        description: { type: String},
        points: { type: Number},
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
