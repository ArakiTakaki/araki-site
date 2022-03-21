import { useEffect, useRef } from "react";

type AnimationFrame = (time: number) => void;

export function loopAnimation(cb: AnimationFrame) {
    let isCancel = false;
    let id = 0;
    const main: AnimationFrame = (time) => {
        if (isCancel) return;
        id = window.requestAnimationFrame(main);
        cb(time);
    }

    id = window.requestAnimationFrame(main);
    return () => {
        isCancel = true;
        window.cancelAnimationFrame(id)
    };
}

export function useRequestAnimationFrame(cb: AnimationFrame) {
    const refCallback = useRef<AnimationFrame>(cb);
    useEffect(() => {
        refCallback.current = cb;
    }, [cb]);
    useEffect(() => {
        let animationFrameId = 0;
        const main: AnimationFrame = (time) => {
            animationFrameId = window.requestAnimationFrame(main);
            refCallback.current(time);
        }
        animationFrameId = requestAnimationFrame(main);
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);
}
