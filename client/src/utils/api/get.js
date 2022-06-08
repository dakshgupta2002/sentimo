const baseUrl = "http://localhost:3001/";

export const get = async (url) => {
    const response = await fetch(baseUrl + url);
    return await response.json();
}