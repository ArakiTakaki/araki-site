import { FC, useEffect, useMemo, useRef } from 'react';
import { useThreeContext } from '../ThreeContext';
import * as THREE from 'three';
import { loopAnimation } from '../../uses/useRequestAnimationFrame';
import { getGenerateCircle } from '../../utils/generateCanvas';
import { useAddObject } from '../../uses/useAddObject';

export const Starts: FC<{
    target: number[];
    ease?: number;
    size?: number;
    map?: THREE.Texture,
    color?: number;
    backgroundColor?: number;
    onAnimate?: (vol: number) => void;
    blending?: THREE.Blending
}> = ({ 
    target,
    ease = 0.004,
    size = 16,
    map = getGenerateCircle(),
    color,
    backgroundColor,
    onAnimate = () => {},
    blending = THREE.AdditiveBlending
}) => {
    
    const { scene, renderer } = useThreeContext();

    const refPrevValue = useRef(target);
    const refPostValue = useRef(target);

    useEffect(() => {
        refPostValue.current = target;
    }, [target]);


    const geometry = useMemo(() => {
        return new THREE.BufferGeometry();
    }, []);

    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size,
            map,
            color,
            transparent: true,
            depthWrite: false,
            blending: blending,
        });
    }, [size, map, color, blending]);
    const camera = useMemo(() => {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
        return camera;
    }, []);

    useEffect(() => {
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [camera]);

    const mesh = useMemo(() => {
        const mesh = new THREE.Points(geometry, material);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(refPrevValue.current, 3));
        return mesh;
    }, [geometry, material]);


    useAddObject(scene, mesh);
    useAddObject(scene, camera);

    useEffect(() => {
        if (backgroundColor == null) return;
        if (scene == null) return;
        scene.background = new THREE.Color(backgroundColor);
        return () => {
            scene.background = null;
        }
    }, [scene, backgroundColor]);

    // animation loop
    useEffect(() => {
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        camera.lookAt(lookatPosition);
        if (renderer == null || scene == null) return;

        camera.position.z = 300;
        const cancel = loopAnimation((time) => {
            camera.position.x = Math.sin(time / 6000.0) * 300;
            camera.position.z = Math.cos(time / 6000.0) * 300;

            onAnimate(time);
            // TODO easing式の展開
            if (ease <= 1) {
                for (let i = 0; i < refPrevValue.current.length; i++ ) {
                    refPrevValue.current[i] += (-refPrevValue.current[i] + refPostValue.current[i]) * ease;
                }
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(refPrevValue.current, 3));
            camera.lookAt(lookatPosition);

            renderer.render(scene, camera);
        });

        return () => {
            cancel();
        };
    }, [scene, renderer, ease, mesh, camera, geometry, onAnimate]);
    return null;
}
