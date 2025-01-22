import { Document } from "mongoose";

export interface ICustomerGroup extends Document {
    name: string;
    approveNewCustomer: boolean;
    description: string;
    sortOrder: number;
    isDeleted: boolean
}

export type CustomerGroupCreateRequest = {
    name: string;
    approveNewCustomer: boolean;
    description: string;
    sortOrder: number;
}

export type CustomerGroupUpdateRequest = {
    id: string;
    name: string;
    approveNewCustomer: boolean;
    description: string;
    sortOrder: number;
}

export type GetCustomerGroupRequest = {
    page: number;
    limit: number;
    search?: string;
};


