import React, { FC, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useCamera } from '../../uses/three/useCamera';
import { useDirectionalLight } from '../../uses/three/useLight';
import { useRender } from '../../uses/three/useRender';
import { useAddObject } from '../../uses/useAddObject';
import { useRequestAnimationFrame } from '../../uses/useRequestAnimationFrame';
import { useThreeContext } from '../ThreeContext';
import { useShader } from '../../uses/three/useShader';
import { deserialize, fbm, hsv2rgb, random, rotate2d, simplex2d, simplex2dFractal } from '../../utils/glsl';

// ref https://www.wpc-store.com/f/feature/detail/?p=2223
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv - .5;
    vUv += .5;
    vUv *= 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}

`;

const fragmentShader = `precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse;

${deserialize([
    simplex2d(),
])}

void main() {
    vec3 color = vec3(0.0);

    vec2 uv = vec2(
        simplex2d(vUv * 3.0) + sin(u_time / 300.0) / 20.0
    ) + vUv;
    u_mouse.x;
    uv += u_mouse / 4000.0;
    float a = simplex2d(uv * 13.0) * 5.4;

    uv = vec2(
        simplex2d(vUv * 3.0) + sin(u_time / 500.0) / 20.0
    ) + vUv;
    uv -= u_mouse / 4000.0;
    color.g = simplex2d(uv * 13.0);

    uv = vec2(
        simplex2d(vUv * 3.0) + sin(u_time / 400.0) / 20.0
    ) + vUv;
    uv += u_mouse / 4000.0;
    color.b = simplex2d(uv * 13.0);

    uv = vec2(
        simplex2d(vUv * 3.0) + sin(u_time / 540.0) / 10.0
    ) + vUv;
    uv -= u_mouse / 4000.0;
    color.r = simplex2d(uv * 13.0);

    gl_FragColor = vec4(color, a);
}
`;

export const Shader2: FC = () => {
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

    const geometry = useMemo(() => {
        return new THREE.SphereGeometry(32, 32, 32);
    }, []);

    const [mesh, registerUniform] = useShader({ fragmentShader, vertexShader, geometry });
    useEffect(() => {
        mesh.scale.x = 4.0;
        mesh.scale.y = 4.0;
        mesh.scale.z = 4.0;
    }, [mesh]);
    useAddObject(scene, mesh);

    const updateUniformTime = registerUniform('u_time', 0);
    registerUniform('u_resolution', [window.innerWidth, window.innerHeight]);
    const updateMouseUniform = registerUniform('u_mouse', [0, 0]);

    const look = useMemo(() => {
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        return lookatPosition;
    }, []);
    useEffect(() => {
        const mouse = (e: MouseEvent) => {
            updateMouseUniform([e.pageX, e.pageY]);
        }
        window.addEventListener('mousemove', mouse);
        return () => {
            window.removeEventListener('mousemove', mouse);
        }
    }, [updateMouseUniform]);

    useRequestAnimationFrame((time, deltaTime) => {
        camera.lookAt(look);
        mesh.rotateX(deltaTime / 5000.0);
        mesh.rotateY(deltaTime / 5000.0);
        mesh.rotateZ(Math.sin(deltaTime / 5000.0));
        updateUniformTime(time);
        render();
    });

    return <></>;
};
