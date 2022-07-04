import { post, get } from './rest';

export const userLogin = async (username, password) => {
    const res = await post("user/login", { username, password }, 'POST');
    return res;
}

export const userRegister = async (username, password, firstName, lastName) => {
    const res = await post("user/register", { username, password, firstName, lastName }, 'POST');
    return res;
}

export const fetchUserProfile = async () => {
    const res = await get("profile/info");
    return res;
}

export const updateUserProfile = async (data) => {
    const res = await post("profile/info", data, 'PUT');
    return res;
}