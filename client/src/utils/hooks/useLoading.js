import { useState } from "react";

export const useLoading = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setErrorMessage = (message) => {
        setError(message);
    }

    const LoadingScreen = () => {
        return <div>
            {loading? <h6>Loading...</h6>: ""}
        </div>
    }
    return {loading, setLoading, error, setErrorMessage, LoadingScreen};
}