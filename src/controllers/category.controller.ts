import { NextFunction, Request, Response } from "express";
import * as categoryService from "../services/category.service";
import { ERROR, SUCCESS } from "../utils/response.helper";

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { general, data, seo, design } = req.body;

    const categoryData = {
      general,
      data,
      seo,
      design,
    };

    const category = await categoryService.createCategory(categoryData);

    return SUCCESS(
      res,
      { code: 201, message: "Category created successfully." },
      category
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id, general, data, seo, design } = req.body;

    const categoryData = {
      id,
      general,
      data,
      seo,
      design,
    };

    const category = await categoryService.updateCategory(categoryData);

    return SUCCESS(
      res,
      { code: 200, message: "Category updated successfully." },
      category
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const searchQuery = typeof search === "string" ? search : "";

    const categories = await categoryService.getCategories({
      page: Number(page),
      limit: Number(limit),
      search: searchQuery,
    });

    return SUCCESS(
      res,
      { code: 200, message: "Categories fetched successfully." },
      categories
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await categoryService.getById(id);

    return SUCCESS(
      res,
      { code: 200, message: "Category fetched successfully." },
      category
    );
  } catch (error) {
      ERROR(res,{
            code:500,
            message:error
        })
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.query.id as string;
    const deletedCategory = await categoryService.deleteCategory(id);

    return SUCCESS(
      res,
      { code: 200, message: "Category deleted successfully." },
      deletedCategory
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};
