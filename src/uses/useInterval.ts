import { useEffect, useRef } from "react";

export const useInterval = (cb: Function, time: number) => {
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