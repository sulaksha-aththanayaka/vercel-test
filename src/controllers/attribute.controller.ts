import { Request, Response } from "express";
import * as attributeService from "../services/attribute.service"
import { ERROR, SUCCESS } from "../utils/response.helper";
export const createAttributeController = async (
    req: Request, 
    res: Response
):Promise<any> => {
    try {

        const attribute = await attributeService.createAttribute(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Attribute created successfully." },
            attribute
        );
    } catch (error) {
        ERROR(res,error)
    }
};

export const updateAttributeController = async (
    req: Request, 
    res: Response
):Promise<any> => {
    try {
        const updatedAttribute = await attributeService.updateAttribute(req.body);
        return SUCCESS(
            res,
            { code: 200, message: "Attribute update successfully." },
            updatedAttribute
        );
    } catch (error) {
        ERROR(res,error)
    }
};

export const deleteAttributeController = async (
    req: Request, 
    res: Response
):Promise<any> => {
    try {
        const deletedAttribute = await attributeService.deleteAttribute(req.query.id as string);
        return SUCCESS(
            res,
            { code: 200, message: "Attribute deleted successfully." },
            deletedAttribute
        );
    } catch (error) {
        ERROR(res,error)
    }
};

export const getAttributesController = async (
    req: Request, 
    res: Response
):Promise<any> => {
    try {
        const attributes = await attributeService.getAttributes(req.query);
        return SUCCESS(
            res,
            { code: 200, message: "Attributes fetched successfully." },
            attributes
        );
    } catch (error) {
        ERROR(res,error)
    }
};

export const getAttributeByIdController = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;
  
    try {
      const banner = await attributeService.getAttributeById(id);
      return SUCCESS(
        res,
        { code: 200, message: "Attribute fetched successfully." },
        banner
      );
    } catch (error: any) {
        ERROR(res,error)
    }
  };