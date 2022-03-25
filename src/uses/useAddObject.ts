import { useEffect } from 'react';
import * as THREE from 'three';

export const useAddObject = (parent: THREE.Object3D, children: THREE.Object3D) => {
    useEffect(() => {
        parent.add(children);
        return () => {
            parent.remove(children);
        }
    }, [parent, children]);
};