import { post } from './rest';

export const userLogin = async (username, password) => {
    const res = await post("user/login", { username, password }, 'POST');
    return res;
}

export const userRegister = async (username, password, firstName, lastName) => {
    const res = await post("user/register", { username, password, firstName, lastName }, 'POST');
    return res;
}