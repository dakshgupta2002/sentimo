const baseUrl = "http://localhost:3001/";

export const post = async (url, data, method) => {
    const response = await fetch(baseUrl + url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(data)
    });

    const json = await response.json();
    return {"data": json, response};
}