import { NextFunction, Request, Response } from "express";
import * as filterService from "../services/filter.service";
import { ERROR, SUCCESS } from "../utils/response.helper";


export const createFilterController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const filter = await filterService.createFilter(req.body);
        return SUCCESS(
            res,
            { code: 201, message: "Filter created successfully." },
            filter
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const updateFilterController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const filter = await filterService.updateFilter(req.body);
        return SUCCESS(
            res,
            { code: 200, message: "Filter updated successfully." },
            filter
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const getFiltersController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const filters = await filterService.getFilters(req.query);
        return SUCCESS(
            res,
            { code: 201, message: "Filter fetched successfully." },
            filters
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const deleteFilterController = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const id = req.query.id as string;
        const filter = await filterService.deleteFilter(id);
        return SUCCESS(
            res,
            { code: 201, message: "Filter deleted successfully." },
            filter
        );
    } catch (error) {
         ERROR(res,{
            code:500,
            message:error
        })
    }
};

export const getFilterByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
  
    try {
      const filter = await filterService.getFilterById(id);
      return SUCCESS(
        res,
        { code: 200, message: "Banner fetched successfully." },
        filter
      );
    } catch (error: any) {
       ERROR(res,{
            code:500,
            message:error
        });
    }
  };
