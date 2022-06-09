const baseUrl = "http://localhost:3001/";

export const get = async (url) => {
    const response = await fetch(baseUrl + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return await response.json();
}