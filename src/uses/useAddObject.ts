import { useEffect } from 'react';
import * as THREE from 'three';

export const useAddObject = (parent: THREE.Object3D | null, children: THREE.Object3D | null) => {
    useEffect(() => {
        if (parent == null || children == null) return;
        parent.add(children);
        return () => {
            parent.remove(children);
        }
    }, [parent, children]);
};