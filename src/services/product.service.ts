import Product from "../models/product.model";
import {
  GetProductRequest,
  ProductRequest,
} from "../types/product.type";

export const createProduct = async (
  req: ProductRequest
): Promise<any> => {
  if (req) {

    const isProductExists = await Product.findOne({ "general.name": req.general.name });
    if(isProductExists){
      throw new Error("Name already exists");
    }
    const newProduct = new Product(req);

    await newProduct.save();

    return newProduct;
  }
  return undefined;
};

export const updateProduct = async (req: ProductRequest): Promise<any> => {
  const { id, ...updateFields } = req;

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  const isProductExists = await Product.findOne({
    "general.name": updateFields.general?.name,
    _id: { $ne: id },
  });

  if (isProductExists) {
    throw new Error("Name already exists");
  }

  Object.assign(product, updateFields);
  const updatedProduct = await product.save();

  return updatedProduct;
};

export const getProducts = async (
  req: GetProductRequest
): Promise<any> => {
  const { page = 1, limit = 10, search } = req;
  const skip = (page - 1) * limit;

  const matchStage: any = { isDeleted: false };

  if (search) {
    matchStage["general.name"] = { $regex: search, $options: "i" };
  }

  const pipeline = [
    { $match: matchStage }, 
    { $skip: skip }, 
    { $limit: limit },
    {
      $addFields: {
        "images": { $sortArray: { input: "$images", sortBy: { sortOrder: 1 } } }
      }
    },
    {
      $facet: {
        products: [{ $project: { __v: 0 } }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await Product.aggregate(pipeline).exec();

  const products = result[0]?.products || [];
  const totalProducts = result[0]?.totalCount[0]?.count || 0;

  return {
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  };
};


export const getProductById = async (
  id: string
): Promise<any> => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product) {
    return product;
  }

  return null;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  product.isDeleted = true
  const deletedProduct = product.save()
  return deletedProduct;
};