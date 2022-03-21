import React, { FC, useEffect, useRef } from 'react';
import { useThreeContext } from '../ThreeContext';
import * as THREE from 'three';
import { loopAnimation } from '../../uses/useRequestAnimationFrame';
import { getGenerateCircle } from '../../utils/generateCanvas';
import { range } from '../../utils/array';

const PI2 = Math.PI * 2;
// 配置する個数
const LENGTH = 1200;

export const Starts: FC<{
    target?: number[];
}> = ({ 
    // target = createHourglassVerticies(LENGTH),
    target = createCircleVerticies(LENGTH),
}) => {
    const threeContext = useThreeContext();
    const scene = threeContext.getScene();
    const renderer = threeContext.getRenderer();
    const refPostValue = useRef(target);

    useEffect(() => {
        refPostValue.current = target;
    }, [target]);

    useEffect(() => {
        const items = [
            createHourglassVerticies(LENGTH),
            createCircleVerticies(LENGTH),
            createExample1(LENGTH),
            createRandomVerticies(LENGTH),
        ];
        let timeline = range(items.length).sort(() => Math.random());
        const createTimeline = () => {
            timeline = range(items.length).sort(() => Math.random());
        }
        createTimeline();

        const id = setInterval(() => {
            if (timeline.length === 0) createTimeline();
            const vertices = items[timeline.pop() || 0];

            refPostValue.current = [...vertices];
        }, 4000);
        return () => {
            clearInterval(id);
        }
    }, []);

    useEffect(() => {
        if (renderer == null) return;
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        // 頂点情報を格納する配列
        const prevVertices = createRandomVerticies(LENGTH);

        // 形状データを作成
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(prevVertices, 3));

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            size: 16,
            map: getGenerateCircle(),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
        scene.add(camera);

        const lookatPosition = new THREE.Vector3(0, 0, 0);
        camera.lookAt(lookatPosition);

        const cancel = loopAnimation((time) => {
            camera.position.x = Math.sin(time / 6000.0) * 300;
            camera.position.z = Math.cos(time / 6000.0) * 300;

            // const deltaParsent = time / 10000;
            for (let i = 0; i < prevVertices.length; i++ ) prevVertices[i] += (-prevVertices[i] + refPostValue.current[i]) * 0.008;
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(prevVertices, 3));
            camera.lookAt(lookatPosition);
            renderer.render(scene, camera);
        });
        window.addEventListener('resize', resize);

        return () => {
            scene.remove(mesh);
            scene.remove(camera);
            cancel();
            window.removeEventListener('resize', resize);
        };
    }, [scene, renderer]);
    return null;
}


const createRandomVerticies = (len: number): number[] => {
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


const createHourglassVerticies = (len: number): number[] => {
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

const createCircleVerticies = (len: number): number[] => {
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
const createExample1 = (len: number): number[] => {
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


// const  = (len: number): number[] => {
//     const vertices = [];
//     const SIZE = 100;

//     for (let i = 0; i < len; i++) {
//         const t = (i / len * PI2) * 20;

//         const y = SIZE * ((i / len - 0.5) * 2);
//         const x = SIZE * Math.sin(t) * (Math.abs((i / len - 0.5) * 2) - 1);
//         const z = SIZE * Math.cos(t) * (Math.abs((i / len - 0.5) * 2) - 1);

//         vertices.push(x, y, z);
//     }
//     return vertices;
// };
