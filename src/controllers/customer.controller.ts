import { NextFunction, Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import * as customerService from "../services/customer.service";

export const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const customer = await customerService.createCustomer(req.body);
    return SUCCESS(res, { code: 201, message: "Customer created successfully." }, customer);
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const updateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const customer = await customerService.updateCustomer(req.body);
    return SUCCESS(res, { code: 200, message: "Customer updated successfully." }, customer);
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string || "";

  try {
    const customers = await customerService.getCustomers({ page, limit, search });
    return SUCCESS(res, { code: 200, message: "Customers fetched successfully." }, customers);
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCustomerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;

  try {
    const customer = await customerService.getCustomerById(id);
    return SUCCESS(res, { code: 200, message: "Customer fetched successfully." }, customer);
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const deleteCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.query.id as string;
    const deletedCustomer = await customerService.deleteCustomer(id);
    return SUCCESS(res, { code: 200, message: "Customer deleted successfully." }, deletedCustomer);
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};