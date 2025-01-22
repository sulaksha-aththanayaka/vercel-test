import { NextFunction, Request, Response } from "express";
import * as attributeGroupService from "../services/attributeGroup.service";
import { ERROR, SUCCESS } from "../utils/response.helper";

export const createAttributeGroupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await attributeGroupService.createAttributeGroup(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Attribute Group created successfully." },
            result
        );
    } catch (error: any) {
       ERROR(res,error)
    }
};

export const updateAttributeGroupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await attributeGroupService.updateAttributeGroup(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Attribute Group updated successfully." },
            result
        );
    } catch (error: any) {
       ERROR(res,error)
    }
};

export const getAllAttributeGroupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { search } = req.query;
        const result = await attributeGroupService.getAttributeGroups({
            search: search?.toString(),
        });
        return SUCCESS(
            res,
            { code: 201, message: "Attribute Groups fetched successfully." },
            result
        );
    } catch (error: any) {
       ERROR(res,error)
    }
};

export const removeAttributeGroupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const result = await attributeGroupService.deleteAttributeGroup(req.query.id as string);
        return SUCCESS(
            res,
            { code: 201, message: "Attribute Group deleted successfully." },
            result
        );
    } catch (error: any) {
       ERROR(res,error)
    }
};

export const getAttributeGroupByIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;

    try {
        const banner = await attributeGroupService.getAttributeGroupById(id);
        return SUCCESS(
            res,
            { code: 200, message: "Attribute Group fetched successfully." },
            banner
        );
    } catch (error: any) {
       ERROR(res,error)

    }
};
