import { Document } from "mongoose";

export interface IAttributeGroup extends Document {
  name: string;
  sortOrder:number;
  isDeleted:boolean
}

export type AttributeGroupCreateRequest = {
    name: string;
    sortOrder:number;
}

export type AttributeGroupUpdateRequest = {
  id:string;
  name: string;
  sortOrder:number;
}

export type GetAttributeGroupRequest = {
  search?: string;
};

