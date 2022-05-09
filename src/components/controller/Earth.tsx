import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { createCurlNoise, parseSimplecNoise } from '../../utils/math';
import { Starts } from '../effects/Stars';
import Simplex from 'simplex-noise';
import { getGenerateCircle2 } from '../../utils/generateCanvas';
import { range, rough } from '../../utils/array';
import { useRandom } from '../../uses/useRandom';

const LENGTH = 10000;
const RESET_TIME = 5000;

export const Earth: FC = () => {
    const [seed, setSeed] = useState('asdfasdf');
    const [verticies, setVerticies] = useState(createRandomVerticies(LENGTH));
    const random = useRandom(123412311234);

    const curlNoise = useMemo(() => {
        const sinplex = new Simplex(seed);
        const noise = parseSimplecNoise(sinplex);
        return createCurlNoise(noise);
    }, [seed]);

    useEffect(() => {
        const id = window.setInterval(() => {
            setVerticies(createRandomVerticies(LENGTH))
            setSeed((Math.random() * 123123123123123).toString());
        }, RESET_TIME);
        return () => {
            window.clearInterval(id);
        };
    }, []);

    const update = useCallback(() => {
        setVerticies((value) => {
            const v: number[] = [];
            const vias = 200;
            const scale = 0.09;
            for (let i = 0; i < value.length; i += 3 ) {
                const x = value[i];
                const y = value[i + 1] + 3.0;
                const z = value[i + 2];

                const noise = curlNoise([
                    x / vias,
                    y / vias,
                    z / vias,
                ], {
                    noiseDiff: 0.01,
                }).map(val => val * scale);

                v.push(x + noise[0], y + noise[1], z + noise[2]);
            }
            return v;
        });
    }, [curlNoise]);
    const texture = useMemo(() => getGenerateCircle2(), []);

    const SPLIT = 1;

    const colors = useMemo(() => {
        return range(SPLIT).map(() => random(0x00FFFF));
    }, [SPLIT, random]);

    const args = useMemo(() => {
        return rough(verticies, verticies.length / SPLIT).map((value, index) => {
            
            return {
                target: value,
                color: colors[index],
            };
        });
    }, [SPLIT, verticies, colors]);

    return (
        <>
            {args.map((values, index) => {
                return (
                    <Starts 
                        key={index} 
                        target={values.target} 
                        ease={1}
                        size={16}
                        map={texture} 
                        onAnimate={update}
                        color={values.color}
                    />
                )
            })}
        </>
    )
};

function createRandomVerticies(len: number): number[]{
    const vertices = [];
    const SIZE = 300;
    for (let i = 0; i < len; i++) {
        const y = SIZE * (Math.random() - 0.5) - 300;
        const x = SIZE * 2 * (Math.random() - 0.5) * 0.9;
        const z = SIZE * (Math.random() - 0.5) * 0.9;
        vertices.push(x, y, z);
    }
    return vertices;
}
