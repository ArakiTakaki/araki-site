import React, { FC, useEffect, useRef } from 'react';
import { useThreeContext } from '../ThreeContext';
import * as THREE from 'three';
import { loopAnimation } from '../../uses/useRequestAnimationFrame';
import { getGenerateCircle } from '../../utils/generateCanvas';

export const Starts: FC<{
    target: number[];
}> = ({ 
    target,
}) => {
    const threeContext = useThreeContext();
    const scene = threeContext.getScene();
    const renderer = threeContext.getRenderer();

    const refPrevValue = useRef(target);
    const refPostValue = useRef(target);

    useEffect(() => {
        refPrevValue.current = refPostValue.current;
        refPostValue.current = target;
    }, [target]);

    useEffect(() => {
        if (renderer == null) return;
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(refPrevValue.current, 3));
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
            for (let i = 0; i < refPrevValue.current.length; i++ ) refPrevValue.current[i] += (-refPrevValue.current[i] + refPostValue.current[i]) * 0.008;
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(refPrevValue.current, 3));
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
