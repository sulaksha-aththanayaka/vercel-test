import Customer from "../models/customer.modal";
import { CustomerCreateRequest, CustomerUpdateRequest, GetCustomerRequest } from "../types/customer.type";

export const createCustomer = async (
  req: CustomerCreateRequest
): Promise<any> => {
  const isEmailExists = await Customer.findOne({ "general.details.email": req.general.details.email });
  if (isEmailExists) {
    throw new Error("Email already exists");
  }

  const newCustomer = new Customer(req);
  await newCustomer.save();
  return newCustomer;
};

export const updateCustomer = async (
  req: CustomerUpdateRequest
): Promise<any> => {
  const { id, general, ...updateFields } = req;
  
  const emailExists = await Customer.findOne({
    "general.details.email": general.details.email,
    _id: { $ne: id },
  });
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new Error("Customer not found");
  }

  if (emailExists) {
    throw new Error("Email already exists for another customer");
  }

  Object.assign(customer, { general, ...updateFields });
  const updatedCustomer = await customer.save();

  return updatedCustomer;
};

export const getCustomers = async (
  req: GetCustomerRequest
): Promise<any> => {
  const { page = 1, limit = 10, search } = req;
  const skip = (page - 1) * limit;

  const matchStage: any = { isDeleted: false };

  if (search) {
    matchStage["$or"] = [
      { "general.details.firstName": { $regex: search, $options: "i" } },
      { "general.details.lastName": { $regex: search, $options: "i" } }
    ];
  }

  const pipeline:any = [
    { $match: matchStage },
    { $skip: skip },
    { $limit: limit },
    {
      $facet: {
        sort : [{ $sort: { createdAt: -1 } }],
        customers: [{ $project: { __v: 0 } }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await Customer.aggregate(pipeline).exec();

  const customers = result[0]?.customers || [];
  const totalCustomers = result[0]?.totalCount[0]?.count || 0;

  return {
    customers,
    totalCustomers,
    totalPages: Math.ceil(totalCustomers / limit),
    currentPage: page,
  };
};


export const getCustomerById = async (
  id: string
): Promise<any> => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new Error("Customer not found");
  }
  return customer;
};

export const deleteCustomer = async (id: string): Promise<any> => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new Error("Customer not found");
  }
  customer.isDeleted = true;
  const deletedCustomer = await customer.save();
  return deletedCustomer;
};