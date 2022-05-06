import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useDirectionalLight = ({
    x = 0,
    y = 0,
    z = 0,
    color = 0xFFFFFF,
    intensity = 1,
}: {
    x?: number,
    y?: number,
    z?: number,
    color?: number,
    intensity?: number,
}) => {
    const refLight = useRef(new THREE.DirectionalLight());
    useEffect(() => {
        refLight.current.intensity = intensity;
    }, [intensity]);
    useEffect(() => {
        refLight.current.color.set(color);
    }, [color]);
    useEffect(() => {
        refLight.current.position.x = x;
    }, [x]);
    useEffect(() => {
        refLight.current.position.y = y;
    }, [y]);
    useEffect(() => {
        refLight.current.position.z = z;
    }, [z]);

    return refLight.current;
}
// const light =  new THREE.DirectionalLight(0xFFFFBB, 1);
// const light =  new THREE.DirectionalLight(0x006666, 1);