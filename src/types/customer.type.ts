import { Document } from "mongoose";

interface Address {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    country: string;
    region: string;
    default: boolean;
}

interface Detials {
    customerGroup: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}

interface Others {
    newsLetter: boolean;
    safe: boolean;
    status: boolean
}

interface History {
    dateAdded:Date;
    comment:string
}

interface Transaction {
    description:string;
    amount:number
}

interface RewardPoint {
    description:string,
    points:number
}

export interface ICustomer extends Document {
    general: {
        details: Detials,
        others:Others
    }
    addresses:[Address],
    histories:[History],
    transactions:[Transaction],
    rewardPoints:[RewardPoint]
    isDeleted: boolean
}

export type CustomerCreateRequest = {
    general: {
        details: Detials,
        others:Others
    }
    addresses:[Address],
    histories:[History],
    transactions:[Transaction],
    rewardPoints:[RewardPoint]
}

export type CustomerUpdateRequest = {
    id: string;
    general: {
        details: Detials,
        others:Others
    }
    addresses:[Address],
    histories:[History],
    transactions:[Transaction],
    rewardPoints:[RewardPoint]
}

export type GetCustomerRequest = {
    page: number;
    limit: number;
    search?: string;
};


