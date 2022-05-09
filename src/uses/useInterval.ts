import { useEffect, useRef } from "react";

export const useInterval = (cb: () => void, time: number) => {
    const refCb = useRef(cb);
    useEffect(() => {
        refCb.current = cb;
    }, [cb]);
    useEffect(() => {
        const id = window.setInterval(() => {
            refCb.current();
        }, time);
        return () => {
            window.clearInterval(id);
        }
    }, [time]);
};