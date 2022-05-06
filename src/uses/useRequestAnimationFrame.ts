import { useEffect, useRef } from "react";

type AnimationFrame = (time: number, deltaTime: number) => void;

export function loopAnimation(cb: AnimationFrame) {
    let isCancel = false;
    let id = 0;
    const main: AnimationFrame = (time) => {
        if (isCancel) return;
        id = window.requestAnimationFrame((time) => {
            main(time, 0);
        });
        cb(time, 0);
    }

    id = window.requestAnimationFrame((time) => {
        main(time, 0)
    });
    return () => {
        isCancel = true;
        window.cancelAnimationFrame(id)
    };
}

export function useRequestAnimationFrame(cb: AnimationFrame) {
    const refCallback = useRef<AnimationFrame>(cb);
    const refDeltaTime = useRef(0);

    useEffect(() => {
        refCallback.current = cb;
    }, [cb]);
    useEffect(() => {
        let animationFrameId = 0;
        const main = (time: number) => {
            animationFrameId = window.requestAnimationFrame(main);
            refCallback.current(time, time - refDeltaTime.current);
            refDeltaTime.current = time;
        }
        animationFrameId = requestAnimationFrame((time) => {
            refDeltaTime.current = time;
            main(time);
        });
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);
}
