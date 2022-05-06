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
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vUv;

void main()	{
    vec3 p = position;
    vUv = uv - .5;
    vUv += .5;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
varying vec2 vUv;
uniform vec2 u_resolution;
#include <fog_pars_fragment>

${
    deserialize([
        random(),
        simplex2d(),
        fbm(5, { noiseFunc: simplex2dFractal() }),
        hsv2rgb(),
        rotate2d(),
    ])
}

void main()	{
    vec3 color;
    color = vec3(0.0);
    vec2 p = (vUv - vec2(0.5)) * 2.0 * 2.;

    float a = (fbm(
        p
        + fbm(
            p
            + fbm(
                p
    ))) + 1.0) / 2.0;

    color.x = a * 0.1 + 0.0 + fbm(p);
    color.y = 1.0;
    color.z = a * 0.8 + 0.5 + fbm(p);

    vec3 c = hsv2rgb(color);
    c = vec3(a);

    gl_FragColor = vec4(c, 1.0);
    #include <fog_fragment>
}
`;

export const OutMaterial: FC = () => {
    const { scene } = useThreeContext();
    const camera = useCamera({ z: -400 })
    const render = useRender(camera);

    useEffect(() => {
        if (scene == null) return;
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

    const [mesh, registerUniform] = useShader({ fragmentShader, vertexShader });
    useEffect(() => {
        mesh.scale.x = 3.0;
        mesh.scale.y = 3.0;
    }, [mesh]);
    useAddObject(scene, mesh);


    const updateUniformTime = registerUniform('u_time', 0);
    registerUniform('u_resolution', [window.innerWidth, window.innerHeight]);

    const look = useMemo(() => {
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        return lookatPosition;
    }, []);

    useRequestAnimationFrame((time, deltaTime) => {
        camera.lookAt(look);
        updateUniformTime(time);
        render();
    });

    return <></>;
};
