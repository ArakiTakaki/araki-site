import React, { FC, useState } from 'react';
import { useInterval } from '../../uses/useInterval';
import { call } from '../../utils/functions';
import { Starts } from '../effects/Stars';
const PI2 = Math.PI * 2;
const LENGTH = 1200;

const TIMELINE = [
    call(createHourglassVerticies, LENGTH),
    call(createCircleVerticies, LENGTH),
    call(createExample1, LENGTH),
    // call(createRandomVerticies, LENGTH),
];

export const TransitionPointsController: FC = () => {
    const [verticies, setVerticies] = useState(createHourglassVerticies(LENGTH));

    useInterval(() => {
        setVerticies(createRandomVerticies(LENGTH));
        setTimeout(() =>{ 
            setVerticies(TIMELINE[Math.floor(TIMELINE.length * Math.random())]());
        }, 2000);
    }, 10000);
    return (
        <Starts target={verticies} ease={0.06} />
    )
};

function createRandomVerticies(len: number): number[]{
    const vertices = [];
    const SIZE = 1000;
    for (let i = 0; i < len; i++) {
        const y = SIZE * (Math.random() - 0.5);
        const x = SIZE * (Math.random() - 0.5);
        const z = SIZE * (Math.random() - 0.5);
        vertices.push(x, y, z);
    }
    return vertices;
};

function createHourglassVerticies(len: number): number[] {
    const vertices = [];
    const SIZE = 100;

    for (let i = 0; i < len; i++) {
        const t = (i / len * PI2) * 20;

        const y = SIZE * Math.sin((i / len - 0.5) * 2);
        const x = SIZE * Math.sin(t) * (i / len - 0.5) * 2;
        const z = SIZE * Math.cos(t) * (i / len - 0.5) * 2;

        vertices.push(x, y, z);
    }
    return vertices;
};

function createCircleVerticies(len: number): number[] {
    const vertices = [];
    const SIZE = 100;

    for (let i = 0; i < len; i++) {
        const t = (i / len * PI2) * 20;

        const y = SIZE * Math.cos((i / len - 0.5) * 2 * Math.PI);
        const x = SIZE * Math.sin(t) * (Math.abs((i / len - 0.5) * 2 * Math.PI) - 1);
        const z = SIZE * Math.cos(t) * (Math.abs((i / len - 0.5) * 2 * Math.PI) - 1);

        vertices.push(x, y, z);
    }
    return vertices;
};

function createExample1(len: number): number[]{
    const vertices = [];
    const SIZE = 100;

    for (let i = 0; i < len; i++) {
        const t = (i / len * PI2) * 20;

        const y = SIZE * Math.sin((i / len - 0.5) * 2 * Math.PI);
        const x = SIZE * Math.sin(t) * (i / len - 0.5) * 2;
        const z = SIZE * Math.cos(t) * (i / len - 0.5) * 2;

        vertices.push(x, y, z);
    }
    return vertices;
};
