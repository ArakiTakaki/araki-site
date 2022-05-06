import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeContextProps {
    renderer: THREE.WebGLRenderer | null,
    scene: THREE.Scene | null,
}

const initialContext: ThreeContextProps = {
    renderer: null,
    scene: null,
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

    useEffect(() => {
        if (threeRenderer == null) return;
        if (size == null) return;
        threeRenderer.setPixelRatio(window.devicePixelRatio);
        threeRenderer.setSize(size.width, size.height);
    }, [threeRenderer, size])

    useEffect(() => {
        if (elCanvas.current == null) throw new Error('');
        const renderer = new THREE.WebGLRenderer({
            canvas: elCanvas.current,
            antialias: true,
        });
        setThreeRenderer(renderer);
        return () => {
            setThreeRenderer(null);
        };
    }, []);

    return (
        <ThreeContext.Provider
            value={{
                renderer: threeRenderer,
                scene,
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