import { NextFunction, Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import * as productSerivce from "../services/product.service";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {  
  try {
    const user = await productSerivce.createProduct(req.body);

    return SUCCESS(
      res,
      { code: 201, message: "Product created successfully." },
      user
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
   
    const product = await productSerivce.updateProduct(req.body);

    return SUCCESS(
      res,
      { code: 200, message: "Products fetched successfully." },
      product
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        })
  }
};

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string || '';

  try {
    const products = await productSerivce.getProducts({ page, limit, search });
    return SUCCESS(
      res,
      { code: 200, message: "Products fetched successfully." },
      products
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;

  try {
    const product = await productSerivce.getProductById(id);
    return SUCCESS(
      res,
      { code: 200, message: "Product fetched successfully." },
      product
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const deleteProductController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const id  = req.query.id as string;
    const deletedCategory = await productSerivce.deleteProduct(id);
    return SUCCESS(
      res,
      { code: 201, message: "Category deleted successfully." },
      deletedCategory
    )
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        })
  }
};
