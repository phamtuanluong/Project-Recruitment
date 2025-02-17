import { get } from "../utils/request"

export const getAllTag = async () => {
    const result = await get(`tags`);
    return result;
} 

export const getTrendingTag = async () => {
    const result = await get (`trending`);
    return result;
}