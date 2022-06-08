const baseUrl = "http://localhost:3001/";

export const post = async (url, data, method) => {
    const response = await fetch(baseUrl + url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}