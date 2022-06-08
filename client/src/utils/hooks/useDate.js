import { useEffect, useState } from "react"

export const useDate = () => {
    const [date, setDate] = useState(new Date().getDate());

    useEffect( () => {
        setDate(new Date().getDate());
    }, []);
    
    const reset = () => {
        setDate(new Date().getDate());
    }

    const previous = () => {
        setDate(date - 1);
    }

    const next = () => {
        setDate(date + 1);
    }

    return [date, setDate, reset, previous, next];
}