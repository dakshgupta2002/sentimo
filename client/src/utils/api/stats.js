import { get } from "./get"

export const fetchStats = async (date) => {
    const res = await get(`stats?date=${date.toLocaleDateString()}`);    
    return res;
}