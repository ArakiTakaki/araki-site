import { useThreeContext } from "../../components/ThreeContext";
import * as THREE from 'three';
import { useCallback } from "react";

export const useRender = (camera: THREE.Camera) => {
    const { scene, renderer } = useThreeContext();

    return useCallback(() => {
        if (renderer == null || scene == null) return;
        renderer.render(scene, camera);
    }, [camera, renderer, scene]);
};
