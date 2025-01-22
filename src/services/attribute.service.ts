import { AttributeCreateRequest, AttributeUpdateRequest, GetAttributeRequest } from "../types/attribute.type";
import Attribute from "../models/attribute.modal";
import AttributeGroup from "../models/attributeGroup.modal";
import { TERROR } from "../utils/response.helper";

export const createAttribute = async (data: AttributeCreateRequest) => {
    const group = await AttributeGroup.findById(data.group);
    if (!group) {
        return TERROR({ code: 404, message: "Attribute group not found." });
    }
    if (group.isDeleted) {
        return TERROR({ code: 400, message: "Attribute group is deleted." });
    }
    const existingAttribute = await Attribute.findOne({
        name: data.name,
        group: data.group,
        isDeleted: false,
    });

    if (existingAttribute) {
        return TERROR({ code: 400, message: "Attribute already exists in this group." });
    }
    const attribute = new Attribute(data);
    return await attribute.save();
};

export const updateAttribute = async (data: AttributeUpdateRequest) => {
    const { id, ...updateData } = data;
    const group = await AttributeGroup.findById(data.group);
    if (!group) {
        return TERROR({ code: 404, message: "Attribute group not found." });
    }
    if (group.isDeleted) {
        return TERROR({ code: 400, message: "Attribute group is deleted." });
    }
    const existingAttribute = await Attribute.findById(id);
    if (!existingAttribute) {
        return TERROR({ code: 404, message: "Attribute not found." });
    }
    const duplicateName = await Attribute.findOne({
        name: updateData.name,
        group: updateData.group,
        _id: { $ne: id },
        isDeleted: false,
    });
    if (duplicateName) {
        return TERROR({ code: 400, message: "Attribute already exists in this group." });
    }
    return await Attribute.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteAttribute = async (id: string) => {
    const attribute = await Attribute.findById(id);
    if (!attribute) {
        return TERROR({ code: 404, message: "Attribute not found." });
    }
    attribute.isDeleted = true;
    return await attribute.save();
};

export const getAttributes = async (query: GetAttributeRequest) => {
    const { search, groupId } = query;

    const pipeline: any[] = [
        { $match: { isDeleted: false } },
    ];

    if (search) {
        pipeline.push({
            $match: {
                name: { $regex: search, $options: "i" },
            },
        });
    }

    if (groupId) {
        pipeline.push({
            $match: {
                $expr: {
                    $eq: [{ $toObjectId: groupId }, "$group"],
                },
            },
        });
    }

    pipeline.push({
        $sort: {
            sortOrder: 1,
            createdAt: 1,
        },
    });

    const attributes = await Attribute.aggregate(pipeline);

    return attributes;
};

export const getAttributeById = async (id: string): Promise<any> => {
    const attributeGroup = await Attribute.findById(id).populate("group");
    if (!attributeGroup) {
        return TERROR({ code: 404, message: "Attribute not found." });
    }
    return attributeGroup;
};
