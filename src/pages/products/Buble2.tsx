import React, { FC, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useCamera } from '../../uses/three/useCamera';
import { useDirectionalLight } from '../../uses/three/useLight';
import { useRender } from '../../uses/three/useRender';
import { useAddObject } from '../../uses/useAddObject';
import { useRequestAnimationFrame } from '../../uses/useRequestAnimationFrame';
import { useThreeContext } from '../../components/ThreeContext';
import { useShader } from '../../uses/three/useShader';

// ref https://www.wpc-store.com/f/feature/detail/?p=2223
const vertexShader = `uniform float u_time;
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

const float PI = 3.141592653;
const float DEG = PI / 180.0;

bool between(float target, float min, float max) {
    return target >= min && target <= max;
}

float norm(float t, float min, float max) {
    return (t - min) / (max - min);
}

float createCircle(vec2 p) {
    float c = 0.0;

    float len_p = length(p);

    if (between(len_p, 0.0, 0.8)) {
        float t = mix(0.0, 1.0, pow(norm(len_p, 0.0, 0.8), 8.0));
        c = t;
    }
    if (between(len_p, 0.8, 1.0)) {
        float t = mix(1.0, 0.0, pow(norm(len_p, 0.8, 1.0), 0.2));
        c = t;
    }
    return c;
}

float createSquare(vec2 position, float width, float height) {
    if (position.x > width || position.x < -width) {
        return 0.0;
    }
    if (position.y > height || position.y < -height) {
        return 0.0;
    }

    return 1.0;
}

float zeroichi(float num) {
    return (num + 1.0) * 2.0;
}

mat2 rotate2d(float _angle){
    return mat2(
        cos(_angle),-sin(_angle),
        sin(_angle),cos(_angle));
}

void main()	{
    vec3 color;
    color = vec3(0.0);
    vec2 p = (vUv - vec2(0.5)) * 2.0;
    float t = sin(u_time / 1000.0) * 1.0 + 300.0;

    for (float i = 0.1; i < 4.0; i += 0.1) {
        float red_line = createSquare(
            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i),
            3.0,
            0.05
        );
        color.r += red_line * 0.5;

        float blue_line = createSquare(
            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i + 0.1),
            3.0,
            0.05
        );
        color.b += (blue_line * 0.5);
        // color.b = 1.0;

        float green_line = createSquare(
            (p * rotate2d(45.0 * DEG * sin(t * i))) - vec2(-1., -2.0 + i - 0.1),
            3.0,
            0.05
        );
        color.g += green_line * 0.5;
    }

    gl_FragColor = vec4(color, 1.0);
    #include <fog_fragment>
}
`;

export const Buble2: FC = () => {
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
        mesh.position.z = -150;
        mesh.position.y = 50;
        mesh.position.x = 50;
    }, [mesh]);
    useAddObject(scene, mesh);

    const [mesh2, registerUniform2] = useShader({ fragmentShader, vertexShader });
    useEffect(() => {
        mesh2.position.z = -150;
        mesh2.position.y = -50;
        mesh2.position.x = 50;
        mesh2.scale.y = -1;
    }, [mesh2]);
    useAddObject(scene, mesh2);

    const [mesh3, registerUniform3] = useShader({ fragmentShader, vertexShader });
    useEffect(() => {
        mesh3.position.z = -150;
        mesh3.position.y = 50;
        mesh3.position.x = -50;
        mesh3.scale.x = -1;
    }, [mesh3]);
    useAddObject(scene, mesh3);

    const [mesh4, registerUniform4] = useShader({ fragmentShader, vertexShader });
    useEffect(() => {
        mesh4.position.z = -150;
        mesh4.position.y = -50;
        mesh4.position.x = -50;
        mesh4.scale.x = -1;
        mesh4.scale.y = -1;
    }, [mesh4]);
    useAddObject(scene, mesh4);

    const updateUniformTime = registerUniform('u_time', 0);
    registerUniform('u_resolution', [window.innerWidth, window.innerHeight]);

    const updateUniformTime2 = registerUniform2('u_time', 0);
    registerUniform2('u_resolution', [window.innerWidth, window.innerHeight]);

    const updateUniformTime3 = registerUniform2('u_time', 0);
    registerUniform3('u_resolution', [window.innerWidth, window.innerHeight]);

    const updateUniformTime4 = registerUniform2('u_time', 0);
    registerUniform4('u_resolution', [window.innerWidth, window.innerHeight]);

    const look = useMemo(() => {
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        return lookatPosition;
    }, []);

    useRequestAnimationFrame((time) => {
        camera.lookAt(look);
        updateUniformTime(time);
        updateUniformTime2(time);
        updateUniformTime3(time);
        updateUniformTime4(time);
        render();
    });

    return <></>;
};
