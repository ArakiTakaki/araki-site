import React, { FC, useEffect, useRef } from "react";
import p5 from 'p5';

interface P5ComponentProps {
    sketch: (p: p5) => void;
}

export const P5Component: FC<P5ComponentProps> = ({ sketch }) => {
    const refWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refWrapper.current == null) throw new Error('');
        const instance = new p5(sketch, refWrapper.current);
        return () => {
            instance.remove();
        }
    }, [sketch]);
    return (<div ref={refWrapper}></div>)
};
