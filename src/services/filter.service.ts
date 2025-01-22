import Filter from "../models/filter.modal";
import { FilterCreateRequest, FilterUpdateRequest, GetFilterRequest } from "../types/filter.type";

export const createFilter = async (data: FilterCreateRequest) => {
    const isFilterGroupExists = await Filter.findOne({ groupName: data.groupName })
    if (isFilterGroupExists) {
        throw new Error("Filter group exists with this name")
    }
    const filter = new Filter(data);
    return await filter.save();
};

export const updateFilter = async (data: FilterUpdateRequest) => {
    const { id, ...updateData } = data;
    const filter = await Filter.findById(id)
    if (!filter) {
        throw new Error("Filter not found");
    }
    const existingFilter = await Filter.findOne({
        $or: [{ groupName: data.groupName }],
        _id: { $ne: id },
    });
    if (existingFilter) {
        throw new Error("Filter group exists with this name")
    }
    return await Filter.findByIdAndUpdate(id, updateData, { new: true });
};

export const getFilters = async (query: GetFilterRequest) => {
    const { search="" } = query;

    const matchStage: any = { isDeleted: false };

    if (search) {
        matchStage.$or = [
            { groupName: { $regex: search, $options: "i" } }, // Match `groupName`
            { "values.name": { $regex: search, $options: "i" } }, // Match `values.name`
        ];
    }

    const pipeline:any = [
        { $match: matchStage }, // Initial filtering
        { $sort: { sortOrder: 1 } }, // Sort by `sortOrder` at group level
        { $unwind: "$values" }, // Flatten the `values` array
        {
            $match: {
                $or: [
                    { "values.name": { $regex: search, $options: "i" } }, // Match `values.name` directly
                    { groupName: { $regex: search, $options: "i" } }, // Or match `groupName`
                ],
            },
        },
        { $sort: { sortOrder: 1, "values.sortOrder": 1 } }, // Sort by group `sortOrder`, then `values.sortOrder`
        {
            $project: {
                _id: 0,
                name: "$values.name", // Include only `values.name`
            },
        },
    ];

    const flattenedValues = await Filter.aggregate(pipeline);
    return flattenedValues;
};


export const deleteFilter = async (id: string) => {
    const filter = await Filter.findById(id)
    if (!filter) {
        throw new Error("Filter not found");
    }
    return await Filter.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const getFilterById = async (
    id: string
): Promise<any> => {
    const filter = await Filter.findById(id);
    if (!filter) {
        throw new Error("Filter not found");
    }
    return filter;
};
