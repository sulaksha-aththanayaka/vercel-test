import CustomerGroup from "../models/customerGroup.modal";
import {
    CustomerGroupCreateRequest,
  CustomerGroupUpdateRequest,
  GetCustomerGroupRequest,
  
} from "../types/customerGroup.type";

export const createCustomerGroup = async (
  req: CustomerGroupCreateRequest
): Promise<any> => {
  const isNameExists = await CustomerGroup.findOne({name:req.name})
  if(isNameExists){
    throw new Error("Name already exists")
  }
  const newCustomerGroup = new CustomerGroup(req);
  await newCustomerGroup.save();
  return newCustomerGroup;
};

export const updateCustomerGroup = async (
  req: CustomerGroupUpdateRequest
): Promise<any> => {
  const { id, ...updateFields } = req;

  const existingCustomerGroup = await CustomerGroup.findOne({
    $or: [{ name:req.name }],
    _id: { $ne: id }, 
  });
  if(existingCustomerGroup){
    throw new Error("Name already exists")
  }

  const customerGroup = await CustomerGroup.findById(id);
  if (!customerGroup) {
    throw new Error("Customer group not found");
  }

  Object.assign(customerGroup, updateFields);
  const updatedCustomerGroup = await customerGroup.save();
  return updatedCustomerGroup;
};

export const getCustomerGroups = async (
  req: GetCustomerGroupRequest
): Promise<any> => {
  const { page = 1, limit = 10, search } = req;
  const skip = (page - 1) * limit;

  const matchStage: any = { isDeleted: false };

  if (search) {
    matchStage["name"] = { $regex: search, $options: "i" };
  }

  const pipeline = [
    { $match: matchStage }, // Match filter criteria
    {
      $facet: {
        customerGroups: [
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

  const result = await CustomerGroup.aggregate(pipeline).exec();

  const customerGroups = result[0]?.customerGroups || [];
  const totalCustomerGroups = result[0]?.totalCount[0]?.count || 0;

  return {
    customerGroups,
    totalCustomerGroups,
    totalPages: Math.ceil(totalCustomerGroups / limit),
    currentPage: page,
  };
};

export const getCustomerGroupById = async (id: string): Promise<any> => {
  const customerGroup = await CustomerGroup.findById(id);
  if (!customerGroup) {
    throw new Error("Customer group not found");
  }
  return customerGroup;
};

export const deleteCustomerGroup = async (id: string): Promise<any> => {
  const customerGroup = await CustomerGroup.findById(id);
  if (!customerGroup) {
    throw new Error("Customer group not found");
  }
  customerGroup.isDeleted = true;
  const deletedCustomerGroup = await customerGroup.save();
  return deletedCustomerGroup;
};
