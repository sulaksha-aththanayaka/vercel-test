import { NextFunction, Request, Response } from "express";
import * as lengthClassService from "../services/lengthClass.service";
import { ERROR, SUCCESS } from "../utils/response.helper";

export const createLengthClassController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const lengthClass = await lengthClassService.createLengthClass(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Length class fetched successfully." },
            lengthClass
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const updateLengthClassController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const lengthClass = await lengthClassService.updateLengthClass(req.body);
        return SUCCESS(
            res,
            { code: 200, message: "Length class updated successfully." },
            lengthClass
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const getLengthClassesController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const lengthClasses = await lengthClassService.getLengthClasses(req.query);
        return SUCCESS(
            res,
            { code: 200, message: "Length classes fetched successfully." },
            lengthClasses
        );

    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const deleteLengthClassController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const id = req.params.id;
        const lengthClass = await lengthClassService.deleteLengthClass(id);
        if (!lengthClass) {
            return res.status(404).json({ message: "LengthClass not found" });
        }
        return SUCCESS(
            res,
            { code: 200, message: "Length classes fetched successfully." },
            lengthClass
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};
