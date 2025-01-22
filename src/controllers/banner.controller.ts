import { NextFunction, Request, Response } from "express";
import { ERROR, SUCCESS } from "../utils/response.helper";
import * as bannerService from "../services/banner.service";

export const createBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const banner = await bannerService.createBanner(req.body);

    return SUCCESS(
      res,
      { code: 201, message: "Banner created successfully." },
      banner
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const updateBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const banner = await bannerService.updateBanner(req.body);

    return SUCCESS(
      res,
      { code: 200, message: "Banner updated successfully." },
      banner
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getBannersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string || '';

  try {
    const banners = await bannerService.getBanners({ page, limit, search });
    return SUCCESS(
      res,
      { code: 200, message: "Banners fetched successfully." },
      banners
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const getBannerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;

  try {
    const banner = await bannerService.getBannerById(id);
    return SUCCESS(
      res,
      { code: 200, message: "Banner fetched successfully." },
      banner
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};

export const deleteBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.query.id as string;
    const deletedBanner = await bannerService.deleteBanner(id);
    return SUCCESS(
      res,
      { code: 200, message: "Banner deleted successfully." },
      deletedBanner
    );
  } catch (error: any) {
     ERROR(res,{
            code:500,
            message:error
        });
  }
};