import { useEffect, useRef } from "react";
import * as THREE from 'three';

export const useCamera = ({x = 0, y = 0, z = 0}: {x?: number, y?: number, z?: number}) => {
    const refCamera = useRef(new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight));

    useEffect(() => {
        refCamera.current.position.x = x;
    }, [x]);

    useEffect(() => {
        refCamera.current.position.y = y;
    }, [y]);
    useEffect(() => {
        refCamera.current.position.z = z;
    }, [z]);

    return refCamera.current;
}