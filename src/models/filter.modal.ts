import mongoose, { Schema } from "mongoose";
import { IFilter } from "../types/filter.type";

const filterSchema = new Schema<IFilter>({
  groupName: { type: String, required: true },
  sortOrder: { type: Number, default:0 },
  values: [
    {
      name: { type: String },
      sortOrder: { type: Number, default:0 },
    },
  ],
  isDeleted: { type: Boolean, default: false },
});

const Filter = mongoose.model<IFilter>("Filter", filterSchema);
export default Filter;
