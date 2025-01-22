import { AttributeGroupCreateRequest, AttributeGroupUpdateRequest, GetAttributeGroupRequest } from "../types/attributeGroup.type";
import AttributeGroup from "../models/attributeGroup.modal";
import { TERROR } from "../utils/response.helper";

export const createAttributeGroup = async (payload: AttributeGroupCreateRequest) => {
  const existing = await AttributeGroup.findOne({
    name: payload.name,
    isDeleted: false,
  });
  if (existing) {
    return TERROR({ code: 400, message: "Attribute group with this name already exists." });
  }

  const newAttributeGroup = new AttributeGroup(payload);
  return await newAttributeGroup.save();
};

// Update an attribute group
export const updateAttributeGroup = async (payload: AttributeGroupUpdateRequest) => {
  const { id, name, sortOrder } = payload;

  const existing = await AttributeGroup.findOne({
    name,
    _id: { $ne: id },
    isDeleted: false,
  });
  if (existing) {
    return TERROR({ code: 400, message: "Attribute group with this name already exists." });
  }

  const updated = await AttributeGroup.findByIdAndUpdate(
    id,
    { name, sortOrder },
    { new: true }
  );
  if (!updated) {
    return TERROR({ code: 404, message: "Attribute group not found." });
  }

  return updated;
};

export const getAttributeGroups = async (query: GetAttributeGroupRequest) => {
  const { search } = query;

  const filter = search
    ? { isDeleted: false, name: { $regex: search, $options: "i" } }
    : { isDeleted: false };

  const attributeGroups = await AttributeGroup.find(filter).sort({ sortOrder: 1, createdAt: 1 });

  return {
    attributeGroups,
  };
};

export const deleteAttributeGroup = async (id: string) => {
  const deleted = await AttributeGroup.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!deleted) {
    return TERROR({ code: 404, message: "Attribute group not found." });
  }
  return deleted;
};

export const getAttributeGroupById = async (id: string): Promise<any> => {
  const attributeGroup = await AttributeGroup.findById(id);
  if (!attributeGroup) {
    return TERROR({ code: 404, message: "Attribute group not found." });
  }
  return attributeGroup;
};
