import { useMemo } from "react";
import * as THREE from 'three';

export const usePolygon = ({
    size = 100,
    detail = 20,
    opacity = 0.5,
    depthWrite = true,
}: {
    size?: number,
    detail?: number,
    opacity?: number,
    depthWrite?: boolean;
} = {}) => {
    const geometry = useMemo(() => new THREE.DodecahedronGeometry(size, detail), [size, detail]);

    const material = useMemo(() => new THREE.MeshStandardMaterial({
        roughness: 0.46,
        metalness: 0.106,
        transparent: true,
        depthTest: true,
        depthWrite,
        opacity,
        blending: THREE.AdditiveBlending,
    }), [opacity, depthWrite]);

    const mesh = useMemo(() => {
        return new THREE.Mesh(geometry, material);
    }, [geometry, material]);

    return mesh;
};
