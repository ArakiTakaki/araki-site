import React, { FC, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useCamera } from '../../uses/three/useCamera';
import { useDirectionalLight } from '../../uses/three/useLight';
import { useRender } from '../../uses/three/useRender';
import { useAddObject } from '../../uses/useAddObject';
import { useRequestAnimationFrame } from '../../uses/useRequestAnimationFrame';
import { useThreeContext } from '../ThreeContext';
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

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

float pattern( in vec2 p, out vec2 q, out vec2 r ) {
    q.x = fbm( p + vec2(0.0,0.0) );
    q.y = fbm( p + vec2(5.2,1.3) );

    r.x = fbm( p + 4.0*q + vec2(1.7,9.2) );
    r.y = fbm( p + 4.0*q + vec2(8.3,2.8) );

    return fbm( p + 4.0*r );
}

vec3 patternd_fbm(in vec2 p, in float offset) {
//   float c = 1.0;
  float r = pattern(p.xy, p.yx, p.xy);
  p.x += sin(offset);
  float g = pattern(p.xy, p.xy, p.xy);
  p.y += cos(offset);
  float b = pattern(p.xy, p.yx, p.yx);
  return vec3(r, g, b);
}
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec3 color = vec3(1.0);
    vec2 p = (vUv - vec2(0.5)) * 2.0 * 2.0;

    color = hsv2rgb(patternd_fbm(p, 50.0));
    color = hsv2rgb(patternd_fbm(p + vec2(0.1, 0.1), 50.0)) - color;
    color *= 10.0;

    gl_FragColor = vec4(color, 1.0);
    #include <fog_fragment>
}

`;

export const Buble: FC = () => {
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

    useRequestAnimationFrame((time, deltaTime) => {
        camera.lookAt(look);
        updateUniformTime(time);
        updateUniformTime2(time);
        updateUniformTime3(time);
        updateUniformTime4(time);
        // mesh.rotateX(deltaTime / 800.0);
        // mesh.rotateY(deltaTime / 230.0);
        // mesh.rotateZ(deltaTime / 400.0);
        render();
    });

    return <></>;
};
