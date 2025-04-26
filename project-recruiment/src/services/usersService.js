import { get, post } from "../utils/request"

export const login = async (email, password) => {
    const results = await get(`company?email=${email}&Password=${password}`);
    return results;
}

export const register = async (options) => {
    const results = await post(`company`, options);
    return results;
}

export const checkExits = async (key, value) => {
    const results = await get(`company?${key}=${value}`);
    return results;
}