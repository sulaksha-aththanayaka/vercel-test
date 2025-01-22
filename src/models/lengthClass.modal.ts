import mongoose, { Schema } from "mongoose";
import { ILengthClass } from "../types/lengthClass.type";

const LengthClassSchema: Schema<ILengthClass> = new Schema(
  {
    title: { type: String, required: true },
    unit: { type: Number, required: true },
    value: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const LengthClass = mongoose.model<ILengthClass>("LengthClass", LengthClassSchema);

export default LengthClass;
