import { useState } from "react";

export const useLoading = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setErrorMessage = (message) => {
        setError(message);
    }

    return {loading, setLoading, error, setErrorMessage};
}