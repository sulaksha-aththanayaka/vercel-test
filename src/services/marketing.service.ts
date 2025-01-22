// marketing.service.ts
import Marketing from "../models/marketing.modal";
import { MarketingCreateRequest, MarketingUpdateRequest, GetMarketingRequest } from "../types/marketing.type";

export const createMarketing = async (data: MarketingCreateRequest) => {
    const isMarketingExists  =await Marketing.findOne({name:data.name})
    if(isMarketingExists){
        throw new Error("Marketing name already exists")
    }
    return await Marketing.create(data);
};

export const updateMarketing = async (req: MarketingUpdateRequest) => {
    const existingMarketing = await Marketing.findOne({
        name: req.name,
        _id: { $ne: req.id },
    });

    if (existingMarketing) {
        throw new Error("Marketing name already exists");
    }

    const marketing = await Marketing.findById(req.id);
    if (!marketing) {
        throw new Error("Marketing not found");
    }

    return await Marketing.findByIdAndUpdate(req.id, req, { new: true });
};


export const deleteMarketing = async (id: string) => {
    const marketing = await Marketing.findById(id)
    if (!marketing) {
        throw new Error("Marketing not found")
    }
    return await Marketing.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const getMarketing = async (query: GetMarketingRequest) => {
    const { page, limit, search } = query;
  
    const filter = search
      ? { isDeleted: false, name: { $regex: search, $options: "i" } }
      : { isDeleted: false };
  
    const marketing = await Marketing.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  
    const totalMarketings = await Marketing.countDocuments(filter);
  
    const totalPages = Math.ceil(totalMarketings / limit);
  
    return {
      marketings: marketing,
      totalMarketings,
      totalPages,
      currentPage: page,
    };
  };
  

export const getMarketingById = async (
    id: string
  ): Promise<any> => {
    const marketing = await Marketing.findById(id);
  
    if (!marketing) {
      throw new Error("Marketing not found");
    }
  
    if (marketing) {
      return marketing;
    }
  
    return null;
  };