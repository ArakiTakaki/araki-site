import { useThreeContext } from "../../components/ThreeContext";
import * as THREE from 'three';
import { useCallback } from "react";

export const useRender = (camera: THREE.Camera) => {
    const { getScene, getRenderer } = useThreeContext();
    const scene = getScene();
    const renderer = getRenderer();
    return useCallback(() => {
        if (renderer == null) return;
        renderer.render(scene, camera);
    }, [camera, renderer, scene]);
};
