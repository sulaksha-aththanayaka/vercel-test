import { NextFunction, Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import * as customerGroupService from "../services/customerGroup.service";

export const createCustomerGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const customerGroup = await customerGroupService.createCustomerGroup(
      req.body
    );

    return SUCCESS(
      res,
      { code: 201, message: "Customer group created successfully." },
      customerGroup
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const updateCustomerGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const customerGroup = await customerGroupService.updateCustomerGroup(
      req.body
    );

    return SUCCESS(
      res,
      { code: 200, message: "Customer group updated successfully." },
      customerGroup
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCustomerGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string || "";

  try {
    const customerGroups = await customerGroupService.getCustomerGroups({
      page,
      limit,
      search,
    });
    return SUCCESS(
      res,
      { code: 200, message: "Customer groups fetched successfully." },
      customerGroups
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCustomerGroupByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;

  try {
    const customerGroup = await customerGroupService.getCustomerGroupById(id);
    return SUCCESS(
      res,
      { code: 200, message: "Customer group fetched successfully." },
      customerGroup
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const deleteCustomerGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.query.id as string;
    const deletedCustomerGroup = await customerGroupService.deleteCustomerGroup(
      id
    );
    return SUCCESS(
      res,
      { code: 200, message: "Customer group deleted successfully." },
      deletedCustomerGroup
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};
