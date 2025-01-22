import { Document } from "mongoose";

export interface IAttribute extends Document {
  name: string;
  sortOrder:number;
  group:object | string;
  isDeleted:boolean
}

export type AttributeCreateRequest = {
    name: string;
    sortOrder:number;
    group:string
}

export type AttributeUpdateRequest = {
  id:string;
  name: string;
  sortOrder:number;
  group:string
}

export type GetAttributeRequest = {
  search?: string;
  groupId?:string
};

