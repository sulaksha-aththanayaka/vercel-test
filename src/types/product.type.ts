import { Document } from "mongoose";

interface General {
  name: string,
  metaTagTitle: string,
  metaTagDescription?: string,
  metaTagKeyWords?: [string],
  productTags?: [string],
  description?: string
}
interface Model {
  model: string,
  location?: string,
  sku?: number,
  upc?: string,
  isbn?: number,
  jan?: number,
  ean?: number,
  mpn?: number
}
interface Price {
  prince?: number,
  taxClass?: string
}
interface Stock {
  qty?: number,
  minQty?: number,
  substrackStock?: boolean,
  outOfStockStatus?: string,
  dateAvailable?: Date
}
interface Dimentions {
  length?: number,
  width?: number,
  height?: number,
  weight?: number,
  weightClass?: number,
  lengthClass?: number
}
interface Links {
  manufacturer?: string,
  categories?: [string],
  filters?: [string],
  stores?: number,
  downloads?: number,
  relatedProducts?: [string]
}
interface Attribute {
  attribute?: string,
  text?: string
}
interface Options {
  type?: string,
  required?: boolean,
  value?: any
}
interface Subscription {
  plan?: string,
  customerGroup?: string,
  totalPrice?: number,
  price?: number
}
interface Discount {
  customerGroup?: string,
  qty?: number,
  priority?: number | string,
  price?: number,
  dateStart?: Date,
  dateEnd?: Date
}

interface Special {
  customerGroup?: string,
  priority?: number | string,
  price?: number,
  dateStart?: Date,
  dateEnd?: Date
}

interface Image {
  image?: string,
  sortOrder?: number | string
}

interface RewardPoint {
  customerGroup?: string,
  points?: string
}

interface Seo {
  stores?: string,
  keywords?: [string]
}

interface Design {
  stores?: string,
  layoutOveride?: string
}
export interface IProduct extends Document {
  general: General,
  data: {
    model: Model,
    price: Price,
    stock: Stock,
    specification: {
      dimentions: Dimentions,
      requiresShipping: boolean,
      status: boolean
    },
  }
  links: Links,
  attribute: [Attribute],
  options: [Options],
  subscriptions: [Subscription],
  discounts: [Discount],
  specials: [Special],
  images: [Image],
  rewardPoints: {
    points: string,
    rewardPoints: [RewardPoint]
  },
  seos: [Seo],
  designs: [Design],
  isDeleted?: boolean;
}

export type ProductRequest = {
  id:string,
  general: General,
  data: {
    model: Model,
    price: Price,
    stock: Stock,
    specification: {
      dimentions: Dimentions,
      requiresShipping: boolean,
      status: boolean
    },
  }
  links: Links,
  attribute: [Attribute],
  options: [Options],
  subscriptions: [Subscription],
  discounts: [Discount],
  specials: [Special],
  images: [Image],
  rewardPoints: {
    points: string,
    rewardPoints: [RewardPoint]
  },
  seos: [Seo],
  designs: [Design],
  isDeleted?: boolean;
};

export type GetProductRequest = {
  page: number;
  limit: number;
  search?: string;
};
