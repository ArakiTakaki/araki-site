import React, { FC, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useCamera } from '../../uses/three/useCamera';
import { useDirectionalLight } from '../../uses/three/useLight';
import { usePolygon } from './usePolygon';
import { useRender } from '../../uses/three/useRender';
import { useAddObject } from '../../uses/useAddObject';
import { useRequestAnimationFrame } from '../../uses/useRequestAnimationFrame';
import { useThreeContext } from '../ThreeContext';
import { useUpdateVerticies } from '../../uses/three/useUpdateVerticies';

// ref https://www.wpc-store.com/f/feature/detail/?p=2223
export const SquareFly: FC = () => {
    const { getScene } = useThreeContext();
    const scene = getScene();
    const camera = useCamera({ z: -400 })
    const render = useRender(camera);

    useEffect(() => {
        const light = new THREE.AmbientLight(0x222200, 1.0);
        scene.add(light);
        return () => {
            scene.remove(light);
        };
    }, [scene]);

    const light1 = useDirectionalLight({ x: -200, y: -100, z: 100, intensity: 1, color: 0x006666 })
    useAddObject(scene, light1);

    const light2 = useDirectionalLight({ x: 150, y: 100, z: -50, intensity: 1, color: 0xFFFFBB })
    useAddObject(scene, light2);

    const mesh = usePolygon({
        size: 200,
        // size: 100,
        opacity: 0.2,
        depthWrite: false,
    });
    useAddObject(scene, mesh);

    const look = useMemo(() => {
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        return lookatPosition;
    }, []);

    const updatePosition = useUpdateVerticies(mesh.geometry);
    useRequestAnimationFrame((time, deltaTime) => {
        camera.lookAt(look);
        mesh.rotateX(deltaTime / 8600);
        mesh.rotateY(deltaTime / 8700);
        mesh.rotateZ(deltaTime / 8800);

        light1.position.y = Math.sin(time / 1000) * 400.0;
        light1.position.z = Math.cos(time / 1000) * 400.0;

        light2.position.x = Math.sin(time / 2200) * 400.0;
        light2.position.z = Math.cos(time / 2000) * 400.0;

        updatePosition({
            x: (value, index) => value + Math.sin(time / 3500 - (index / 90.0)) * 200.0,
            y: (value, index) => value + Math.sin(time / 3500 - (index / 40.0)) * 250.0,
            z: (value, index) => value + Math.sin(time / 3500 - (index / 70.0)) * 300.0,
        });
        render();
    });
    // return null;
    return (
        <>
            {/* 青いスクリーン */}
            <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: "#faa",
                opacity: 0.5,
                mixBlendMode: 'overlay',
                width: '100vw',
                height: '100vh',
            }} />
            <div style={{
                boxSizing: 'content-box',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                mixBlendMode: 'multiply',
                backgroundColor: '#fff',
                boxShadow: 'inset 20px 20px 30vw #000',
            }}/>
            <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'linear-gradient(#00606b, #999, #fff, #000)',
                mixBlendMode: 'soft-light',
                width: '100vw',
                height: '100vh',
            }} />

            {/* オレンジアウト */}
            <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'linear-gradient(rgba(0,0,0,0) 50%, #ffae00 300%)',
                mixBlendMode: 'overlay',
                width: '100vw',
                height: '100vh',
            }}/>
        </>
    );
};
