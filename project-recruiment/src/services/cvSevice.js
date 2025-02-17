import { del, get, patch, post } from "../utils/request"

export const CreateCV = async (options) => {
    const result = await post(`cv`, options);
    return result;
}

export const getCV = async (id) => {
    const result = await get(`cv/${id}`);
    return result;
}

export const EditCV = async (id, options) => {
    const result = await patch(`cv/${id}`, options);
    return result;
}

export const getListCV = async (id) => {
    const result = await get(`cv?idCompany=${id}`);
    return result;
}

export const deleteCV = async (id) => {
    const result = await del(`cv/${id}`);
    return result;
}