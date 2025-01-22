import { Document } from "mongoose";

export interface IStore extends Document {
  general:{
    url:string;
    metaTitle:string;
    metaTagDescription:string;
    metaTagKeyWords:[string];
    storeLogo:string;
  }
  isDeleted:boolean
}

export type StoreCreateRequest = {
  name: string;
  image?: string;
  link:string;
  title:string;
  sortOrder?:number;
}

export type StoreUpdateRequest = {
  id:string;
  name: string;
  image?: string;
  link:string;
  title:string;
  sortOrder?:number;
}

export type GetStoreRequest = {
  page: number;
  limit: number;
  search?: string;
};

