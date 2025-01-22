import Banner from '../models/banner.modal'
import { BannerCreateRequest, BannerUpdateRequest, GetBannerRequest } from "../types/banner.type";


export const createBanner = async (
  req: BannerCreateRequest
): Promise<any> => {

  const isNameExists = await Banner.findOne({
    name: req.name,
    // "bannerImages.title": { $in: req.bannerImages.map((img) => img.title) }
  });
  
  if(isNameExists){
    throw new Error("Banner name already exists")
  }
  const newBanner = new Banner(req);
  await newBanner.save();
  return newBanner;
};

export const updateBanner = async (
  req: BannerUpdateRequest
): Promise<any> => {
  const { id, name, status, bannerImages, ...updateFields } = req;

  const existingBanner = await Banner.findOne({
    _id: { $ne: id }, // Exclude the current banner
    $or: [
      { name: name },
      // { "bannerImages.title": { $in: bannerImages?.map((img) => img.title) || [] } }
    ],
  });

  if (existingBanner) {
    throw new Error("Banner name already exists");
  }

  const banner = await Banner.findById(id);
  if (!banner) {
    throw new Error("Banner not found");
  }

  if (name) banner.name = name;
  if (status !== null || status !== undefined) banner.status = status;
  if (bannerImages) banner.bannerImages = bannerImages;

  const updatedBanner = await banner.save();
  return updatedBanner;
};

export const getBanners = async (
  req: GetBannerRequest
): Promise<any> => {
  const { page = 1, limit = 10, search } = req;
  const skip = (page - 1) * limit;

  const matchStage: any = { isDeleted: false };

  if (search) {
    matchStage["name"] = { $regex: search, $options: "i" };
  }

  const pipeline:any = [
    { $match: matchStage },
    {
      $facet: {
        banners: [
          {$sort: { createdAt: -1 }}, // Sort documents by createdAt in descending order
          { $skip: skip }, // Apply pagination
          { $limit: limit },
          { $project: { __v: 0 } } // Exclude the __v field
        ],
        totalCount: [
          { $count: "count" } // Get total count of documents matching the criteria
        ],
      },
    },
  ];

  const result = await Banner.aggregate(pipeline).exec();

  const banners = result[0]?.banners || [];
  const totalBanners = result[0]?.totalCount[0]?.count || 0;

  return {
    banners,
    totalBanners,
    totalPages: Math.ceil(totalBanners / limit),
    currentPage: page,
  };
};

export const getBannerById = async (
  id: string
): Promise<any> => {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new Error("Banner not found");
  }
  return banner;
};

export const deleteBanner = async (id: string): Promise<any> => {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new Error("Banner not found");
  }
  banner.isDeleted = true
  const deletedBanner = await banner.save();
  return deletedBanner;
};

export const statusChange = async(id:string):Promise<any> => {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new Error("Banner not found");
  }
  banner.status = !banner.status
  const deletedBanner = await banner.save();
  return deletedBanner;
}
