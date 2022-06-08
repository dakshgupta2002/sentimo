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
        date.setDate(date.getDate() - 1);
        console.log(date.toDateString());
        setDate(date);
    }

    const next = () => {
        var sameDate = (date.getDate() === new Date().getDate());
        var sameMonth = (date.getMonth() === new Date().getMonth());
        var sameYear = (date.getFullYear() === new Date().getFullYear());

        if (!sameDate || !sameMonth || !sameYear)
            date.setDate(date.getDate() + 1);

        setDate(date);
    }

    return [date, setDate, reset, previous, next];
}