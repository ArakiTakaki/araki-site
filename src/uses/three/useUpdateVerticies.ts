import { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { editSplitArrayMap } from '../../utils/math';

interface Editable {
    x: (value: number, index: number, array: number[]) => number;
    y: (value: number, index: number, array: number[]) => number;
    z: (value: number, index: number, array: number[]) => number;
}

export const useUpdateVerticies = (geometry: THREE.BufferGeometry) => {
    const positions = useMemo(() => {
        const positions = geometry.getAttribute('position');
        const points: number[] = [];
        for (let i = 0; i < positions.array.length; i += 1) points.push(positions.array[i]);
        return points;
    }, [geometry]);

    return useCallback((cb: Editable) => {
        const p = positions.map(editSplitArrayMap(
            cb.x,
            cb.y,
            cb.z,
        ));
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    }, [positions, geometry]);
};
