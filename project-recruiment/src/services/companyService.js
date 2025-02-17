import {get, patch} from "../utils/request";

export const getAllCompany =  async() => {
    const result = await get(`company`);
    return result;
}

export const getCompany = async (id) => {
    const result = await get(`company/${id}`);
    return result;
}

export const CompanyEdit = async(id, options) => {
    const result = await patch(`company/${id}`, options);
    return result;
}