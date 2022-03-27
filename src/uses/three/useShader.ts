import { useCallback, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export const useShader = ({
    fragmentShader = '',
    vertexShader = '',
    fog = false,
}: {
    fragmentShader: string,
    vertexShader: string,
    uniforms?: { [uniform: string]: THREE.IUniform },
    fog?: boolean;
}): [THREE.Mesh<THREE.PlaneBufferGeometry, THREE.ShaderMaterial>, (key: string, initialValue: number | number[]) => (value: number | number[]) => void] => {
    // const geometry = useMemo(() => new THREE.SphereGeometry( 15, 32, 16 ), []);
    const geometry = useMemo(() => new THREE.PlaneBufferGeometry(100, 100, 10, 10), []);
    // const geometry = useMemo(() => new THREE.IcosahedronGeometry(80, 4), []);
    const material = useMemo(() => new THREE.ShaderMaterial(), []);

    useEffect(() => { material.vertexShader = vertexShader }, [material, vertexShader]);
    useEffect(() => { material.fragmentShader = fragmentShader }, [material, fragmentShader]);
    useEffect(() => { material.fog = fog }, [material, fog]);

    const mesh = useMemo(() => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI);
        return mesh
    }, [material, geometry]);

    const registerUniform = useCallback((key: string, initialValue: number | number[]) => {
        material.uniforms[key] = { value: initialValue };
        const updateUniform = (value: number | number[]) => { material.uniforms[key].value = value; };
        return updateUniform;
    }, [material]);

    return [
        mesh,
        registerUniform,
    ];
}