import { Document } from "mongoose";

export interface ICategory extends Document {
  general: {
    name: string;
    metaTagTitle: string;
    metaTagDescription: string;
    metaTagKeywords: string[];
    description: string;
  };
  data: {
    parent: ICategory | undefined | null;
    filters: string[];
    columns: string[];
    sortOrder: number;
    stores: string;
    top: boolean;
    status: boolean;
    image: string;
  };
  seo: {
    stores: string;
    keywords: string[];
  };
  design: {
    stores: string;
    layoutOverride: string;
  };
  isDeleted: boolean;
}

export type CategoryCreateRequest = {
  general: {
    name: string;
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string[];
    description?: string;
  };
  data: {
    parent?: ICategory | undefined | null;
    filters?: string[];
    columns?: string[];
    sortOrder?: number;
    stores?: string;
    top?: boolean;
    status?: boolean;
    image?: string;
  };
  seo: {
    stores?: string;
    keywords?: string[];
  };
  design: {
    stores?: string;
    layoutOverride?: string;
  };
};

export type CategoryUpdateRequest = {
  id: string;
  general: {
    name: string;
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string[];
    description?: string;
  };
  data: {
    parent?: ICategory | undefined | null;
    filters?: string[];
    columns?: string[];
    sortOrder?: number;
    stores?: string;
    top?: boolean;
    status?: boolean;
    image?: string;
  };
  seo: {
    stores?: string;
    keywords?: string[];
  };
  design: {
    stores?: string;
    layoutOverride?: string;
  };
};

export type CategoryResponse = {
  id: string;
  general?: {
    name?: string;
    metaTagTitle?: string;
    metaTagDescription?: string;
    metaTagKeywords?: string[];
    description?: string;
  };
  data?: {
    parent?: ICategory | undefined | null;
    filters?: string[];
    columns?: string[];
    sortOrder?: number;
    stores?: string;
    top?: boolean;
    status?: boolean;
    image?: string;
  };
  seo?: {
    stores?: string;
    keywords?: string[];
  };
  design?: {
    stores?: string;
    layoutOverride?: string;
  };
  isDeleted?: boolean;
};
