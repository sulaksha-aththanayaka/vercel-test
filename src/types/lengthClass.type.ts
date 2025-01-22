import { Document } from "mongoose";

export interface ILengthClass extends Document {
  title: string;
  unit:number;
  value:number
  isDeleted:boolean
}

export type LengthClassCreateRequest = {
    title: string;
    unit:number;
    value:number
}

export type LengthClassUpdateRequest = {
  id:string;
  title: string;
  unit:number;
  value:number
}

export type GetLengthClassRequest = {
  search?: string;
};

