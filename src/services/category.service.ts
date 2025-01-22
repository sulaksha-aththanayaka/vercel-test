import Category from "../models/category.modal";
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from "../types/category.type";

export const createCategory = async (
  req: CategoryCreateRequest
): Promise<any> => {
  const { general, data, seo, design } = req;

  if (data.parent) {
    const parentCategory = await Category.findById(data.parent);
    if (!parentCategory) {
      throw new Error("Parent category not found");
    }
  }else{
    data.parent = null
  }

  const isNameExist = await Category.findOne({ "general.name": general.name });
  if (isNameExist) {
    throw new Error("Name already exists");
  }
  
  const newCategory = new Category({
    general,
    data,
    seo,
    design,
  });

  const savedCategory = await newCategory.save();

  return savedCategory;
};

export const updateCategory = async (
  req: CategoryUpdateRequest
): Promise<any> => {
  const { id, general, data, seo, design } = req;

  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }

  const existingCategory = await Category.findOne({
    "general.name": general.name,
    _id: { $ne: id },
  });
  if (existingCategory) {
    throw new Error("Name already exists");
  }
  if (data.parent) {
    const parentCategory = await Category.findById(data.parent);
    if (!parentCategory) {
      throw new Error("Parent category not found");
    }
  }else{
    data.parent = null
  }
  category.general = { ...category.general, ...general };
  category.data = { ...category.data, ...data };
  category.seo = { ...category.seo, ...seo };
  category.design = { ...category.design, ...design };

  const updatedCategory = await category.save();

  return updatedCategory;
};

export const getCategories = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}): Promise<any> => {
  const skip = (page - 1) * limit;

  const query: any = { isDeleted: false };

  if (search) {
    query["general.name"] = { $regex: search, $options: "i" };
  }

  const categories = await Category.find(query)
  .sort({ sortOrder: 1, createdAt: 1 })
  .skip(skip)
  .limit(limit)
  .exec();

  const totalCategories = await Category.countDocuments(query);

  return {
    categories,
    totalCategories,
    totalPages: Math.ceil(totalCategories / limit),
    currentPage: page,
  };
};

export const getById = async (id: string): Promise<any> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const deleteCategory = async (id: string): Promise<any> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  category.isDeleted = true;
  const deletedCategory = await category.save();
  return deletedCategory;
};
