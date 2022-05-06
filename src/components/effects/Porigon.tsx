import { FC, useEffect, useMemo } from 'react';
import { useThreeContext } from '../ThreeContext';
import * as THREE from 'three';
import { useAddObject } from '../../uses/useAddObject';

export const Porigon: FC<{}> = () => {
    const { scene } = useThreeContext();
    const geometry = useMemo(() => new THREE.DodecahedronGeometry(30, 3), []);
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        roughness: 0.46,
        metalness: 0.106,
        depthTest: true,
    }), []);

    useEffect(() => {
        const positions = geometry.getAttribute('position');
        console.log(positions.array)
    }, [geometry]);
    const mesh = useMemo(() => {
        return new THREE.Mesh(geometry, material);
    }, [geometry, material]);

    useAddObject(scene, mesh);
    return null;
}
