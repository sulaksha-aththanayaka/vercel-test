import { Document } from "mongoose";

export interface IMarketing extends Document {
  name: string;
  description: string;
  trackingCode:string;
  example:[string];
  isDeleted:boolean
}

export type MarketingCreateRequest = {
  name: string;
  description: string;
  trackingCode:string;
  example:[string];
}

export type MarketingUpdateRequest = {
  id:string;
  name: string;
  description: string;
  trackingCode:string;
  example:[string];
}

export type GetMarketingRequest = {
  page: number;
  limit: number;
  search?: string;
};

