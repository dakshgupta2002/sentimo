const baseUrl = "http://localhost:3001/";

export const get = async (url) => {
    const response = await fetch(baseUrl + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const json = await response.json();
    return {"data": json, response};
}