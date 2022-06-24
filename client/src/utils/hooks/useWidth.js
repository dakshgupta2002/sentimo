import { useEffect, useState } from "react";

export const useWidth = () =>{
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    const update = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    window.addEventListener('resize', () => {
        update();
    })
    useEffect( () => {
        update();
    }, [])

    return { height, width };
}