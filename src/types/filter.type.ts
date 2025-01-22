import { Document } from "mongoose";

export interface IFilter extends Document {
    groupName: string;
    sortOrder: number;
    values: [{
        name: string,
        sortOrder: number
    }]
    isDeleted: boolean
}

export type FilterCreateRequest = {
    groupName: string;
    sortOrder: number;
    values: [{
        name: string,
        sortOrder: number
    }]
}

export type FilterUpdateRequest = {
    id: string;
    groupName: string;
    sortOrder: number;
    values: [{
        name: string,
        sortOrder: number
    }]
}

export type GetFilterRequest = {
    search?: string;
};

