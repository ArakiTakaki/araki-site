import React, { FC, useEffect } from 'react';
import { useThreeContext } from '../ThreeContext';
import * as THREE from 'three';
import { loopAnimation } from '../../uses/useRequestAnimationFrame';

export const Starts: FC = () => {
    const threeContext = useThreeContext();
    const scene = threeContext.getScene();
    const renderer = threeContext.getRenderer();
    useEffect(() => {
        if (renderer == null) return;

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);

        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        // 頂点情報を格納する配列
        const vertices = [];

        // 配置する範囲
        const SIZE = 3000;
        // 配置する個数
        const LENGTH = 8000;

        for (let i = 0; i < LENGTH; i++) {
            const x = SIZE * (Math.random() - 0.5);
            const y = SIZE * (Math.random() - 0.5);
            const z = SIZE * (Math.random() - 0.5);
            vertices.push(x, y, z);
        }

        // 形状データを作成
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            // 一つ一つのサイズ
            size: 10,
            // 色
            color: 0xffffff,
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
        scene.add(camera);
        const lookatPosition = new THREE.Vector3(0, 0, 0);
        camera.lookAt(lookatPosition);

        const cancel = loopAnimation((time) => {
            camera.position.x = Math.sin(time / 6000.0) * 100;
            camera.position.z = Math.cos(time / 6000.0) * 100;
            camera.lookAt(lookatPosition);
            renderer.render(scene, camera);
        });
        window.addEventListener('resize', resize);

        return () => {
            scene.remove(mesh);
            scene.remove(camera);
            cancel();
            window.removeEventListener('resize', resize);
        };
    }, [scene, renderer]);
    return null;
}
