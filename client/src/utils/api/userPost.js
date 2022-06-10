import { post } from './post';

export const userLogin = async (username, password) => {
    const res = await post("user/login", { username, password }, 'POST');
    return res;
}

export const userRegister = async (username, password) => {
    const res = await post("user/register", { username, password }, 'POST');
    return res;
}