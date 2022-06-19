import { useEffect, useState } from "react"

export const useDate = () => {
    
    const [date, setDate] = useState(new Date());

    useEffect( () => {
        setDate(new Date());
    }, []);
    
    const reset = () => {
        setDate(new Date());
    }

    const previous = () => {
        const prevDate = new Date(date.setDate(date.getDate() - 1));
        setDate(prevDate);
    }

    const next = () => {
        var sameDate = (date.getDate() === new Date().getDate());
        var sameMonth = (date.getMonth() === new Date().getMonth());
        var sameYear = (date.getFullYear() === new Date().getFullYear());

        if (!sameDate || !sameMonth || !sameYear) {
            const nextDate = new Date(date.setDate(date.getDate() + 1));
            setDate(nextDate);
        }
    }

    const today = new Date(date).toLocaleDateString() === (new Date()).toLocaleDateString();

    return {date, setDate, reset, previous, next, today};
}