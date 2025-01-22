import { NextFunction, Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import { statusChange } from "../services/banner.service";


export const bannerStatusChange = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const id = req.query.id
        const banner = await statusChange(id as string)
        return SUCCESS(
            res,
            { code: 201, message: "Banner status change successfully." },
            banner
        );
    } catch (error: any) {
        ERROR(res, {
            code: 500,
            message: error
        });
    }
};