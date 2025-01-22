import { Document } from "mongoose";

export interface IBannerImage {
  title: string;
  image?: string;
  link: string;
  sortOrder?: number;
}

export interface IBanner extends Document {
  name: string;
  bannerImages: IBannerImage[];
  status?: boolean;
  isDeleted?: boolean;
}

export type BannerCreateRequest = {
  name: string;
  bannerImages: IBannerImage[];
  status?: boolean;
};

export type BannerUpdateRequest = {
  id: string;
  name?: string;
  bannerImages?: IBannerImage[];
  status?: boolean;
};

export type GetBannerRequest = {
  page: number;
  limit: number;
  search?: string;
};