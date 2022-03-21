import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeContextProps {
    getRenderer: () => THREE.WebGLRenderer,
    getScene: () => THREE.Scene,
}

const initialContext: ThreeContextProps = {
    getRenderer: () => {
        throw new Error('');
    },
    getScene: () => {
        throw new Error('');
    },
};

const ThreeContext = createContext<ThreeContextProps>(initialContext);

export const useThreeContext = () => useContext(ThreeContext);
export const ThreeProvider: FC = ({ children }) => {
    const size = useSize();
    const elCanvas = useRef<HTMLCanvasElement>(null)
    const [threeRenderer, setThreeRenderer] = useState<THREE.WebGLRenderer | null>(null);

    const scene = useMemo(() => {
        return new THREE.Scene();
    }, []);
    const getScene = useCallback(() => {
        return scene;
    }, [scene]);

    const getRenderer = useCallback((): THREE.WebGLRenderer => {
        if (threeRenderer == null) throw new Error('get renderer error');
        return threeRenderer;
    }, [threeRenderer]);

    useEffect(() => {
        if (threeRenderer == null) return;
        if (size == null) return;
        threeRenderer.setPixelRatio(window.devicePixelRatio);
        threeRenderer.setSize(size.width, size.height);
    }, [threeRenderer, size])

    useEffect(() => {
        if (elCanvas.current == null) throw new Error('');
        const renderer = new THREE.WebGLRenderer({ canvas: elCanvas.current });
        setThreeRenderer(renderer);
        return () => {
            setThreeRenderer(null);
        };
    }, []);

    return (
        <ThreeContext.Provider
            value={{
                getRenderer,
                getScene,
            }}
        >
            <canvas ref={elCanvas} />
            {children}
        </ThreeContext.Provider>
    );
};

function useSize() {
    const [size, setSize] = useState<{width: number, height: number}>();

    const resize = useCallback(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, []);

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [resize]);

    return size;
};