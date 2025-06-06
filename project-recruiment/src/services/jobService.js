import { del, get, patch, post } from "../utils/request"

export const getDetailJob = async (id) => {
    const result = await get(`jobs/${id}`);
    return result;
}
export const getAllJob = async () => {
    const result = await get(`jobs`);
    return result;
}

export const getListJob = async (id) => {
    const result = await get(`jobs?idCompany=${id}`);
    return result;
}

export const editJob = async(id, options) => {
    const result = await patch(`jobs/${id}`, options);
    return result;
}

export const DeleteDetailJob = async (id) => {
    const result = await del(`jobs/${id}`);
    return result;
}

export const JobCreate = async (options) => {
    const result = await post(`jobs`, options);
    return result;
}