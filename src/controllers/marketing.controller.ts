// marketing.controller.ts
import { NextFunction, Request, Response } from "express";
import * as marketingService from "../services/marketing.service";
import { ERROR, SUCCESS } from "../utils/response.helper";

export const createMarketing = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const marketing = await marketingService.createMarketing(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Marketing created successfully." },
            marketing
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const updateMarketing = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const marketing = await marketingService.updateMarketing(req.body);
        if (!marketing) {
            return res.status(404).json({ message: "Marketing not found" });
        }
        return SUCCESS(
            res,
            { code: 200, message: "Marketing updated successfully." },
            marketing
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const deleteMarketing = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const  id  = req.query.id as string;
        const marketing = await marketingService.deleteMarketing(id);
        return SUCCESS(
            res,
            { code: 200, message: "Marketing deleted successfully." },
            marketing

        )
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const getMarketing = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    try {
        const marketing = await marketingService.getMarketing({page,limit,search});
        return SUCCESS(
            res,
            {code:200,message:"Marketings fetched successfully"},
            marketing
        )
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const getMarketingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const product = await marketingService.getMarketingById(id);
      return SUCCESS(
        res,
        { code: 200, message: "Marketing fetched successfully." },
        product
      );
    } catch (error: any) {
       ERROR(res,{
            code:500,
            message:error
        });
    }
  };
