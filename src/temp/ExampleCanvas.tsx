import React, { useMemo, useRef } from 'react';
import { useRequestAnimationFrame } from '../uses/useRequestAnimationFrame';
import { minMax } from '../utils/math';
import { reactionDeffusion } from '../utils/reactionDiffusion';

export const ExampleCanvas = () => {
    const WIDTH = 100;
    const HEIGTH = 100;

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refContext = useRef<CanvasRenderingContext2D>();
    const reactionDeffusionUpdate = useMemo(() => reactionDeffusion(WIDTH, HEIGTH), []);

    useRequestAnimationFrame(() => {
        if (refContext.current == null) {
            if (refCanvas.current == null) return;
            const context =  refCanvas.current.getContext('2d');
            if (context == null) return;
            refContext.current = context;
            return;
        }
        if (refContext.current == null) return;

        reactionDeffusionUpdate();
        reactionDeffusionUpdate();
        reactionDeffusionUpdate();
        reactionDeffusionUpdate();
        const t = reactionDeffusionUpdate();
        for (let i = 0; i < HEIGTH; i++) {
            for (let j = 0; j < WIDTH; j++) {
                const a = minMax(t[i][j], 0, 1);
                const l = Math.floor(a * a * 100);
                refContext.current.fillStyle = 'hsl(0, 0%,' + l + '%)';
                refContext.current.fillRect(i, j, 10, 10);
            }
        }
    });

    return (
        <div className='h-full w-full flex justify-center'>
            <canvas ref={refCanvas} width={WIDTH} height={HEIGTH} className="max-w-screen max-h-screen h-full aspect-square" />
        </div>
    )
};
