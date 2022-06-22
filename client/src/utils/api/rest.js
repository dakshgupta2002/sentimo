const baseUrl = "http://13.233.160.50:3001/";

export const get = async (url) => {
    try{
        const response = await fetch(baseUrl + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        });
        
        const json = await response.json();
        return {"data": json, response};
    }catch{
        return {"data": null, response: null};
    }
}

export const post = async (url, data, method) => {
    try{
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
    }catch{
        return {"data": null, response: null};
    }
}