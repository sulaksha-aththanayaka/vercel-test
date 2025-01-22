import LengthClass from "../models/lengthClass.modal";
import { LengthClassCreateRequest, LengthClassUpdateRequest, GetLengthClassRequest } from "../types/lengthClass.type";

export const createLengthClass = async (data: LengthClassCreateRequest) => {
    const isLengthClassExists = await LengthClass.findOne({ title: data.title })
    if (isLengthClassExists) {
        throw new Error("Length class already exists with this title")
    }
    const lengthClass = new LengthClass(data);
    await lengthClass.save();
    return lengthClass;
};

export const updateLengthClass = async (data: LengthClassUpdateRequest)=> {
    const lengthClass = await LengthClass.findById(data.id)
    if(!lengthClass){
        throw new Error("Length class not found")
    }
    const existingLengthClass = await LengthClass.findOne({
        $or: [{ title:data.title }],
        _id: { $ne: data.id },
    });
    if(existingLengthClass){
        throw new Error("Length class already exists with this title")
    }

    return await LengthClass.findByIdAndUpdate(data.id, data, { new: true });
};

export const getLengthClasses = async (query: GetLengthClassRequest) => {
    const { search } = query;

    const filter: any = { isDeleted: false };

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    const lengthClasses = await LengthClass.find(filter);

    return lengthClasses
};

export const deleteLengthClass = async (id: string) => {
    const lengthClass = await LengthClass.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return lengthClass;
};

export const getLengthClassById = async (id: string) => {
    const lengthClass = await LengthClass.findById(id);
    return lengthClass;
  };
