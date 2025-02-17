import {get} from "../utils/request";

export const getAllCity = async () => {
    const result = await get(`city`);
    return result;
}