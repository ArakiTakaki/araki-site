import * as THREE from 'three';
import bezier from '@takumus/cubic-bezier';
import { mix } from './math';
import { call } from './functions';
import { hsl2rgb } from './color';

export function getGenerateCircle() {
    //canvasで小さい丸の作成
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('');
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.01, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

const easeInOutQuad = bezier(0.455, 0.03, 0.515, 0.955);
const easeOutQuart =  bezier(0.25, 0.46, 0.45, 0.94);

const createRgb = (r: string | number, g: string | number, b: string | number, a: string | number = '1') => `rgba(${r}, ${g}, ${b}, ${a})`

export function getGenerateCircle2() {
    //canvasで小さい丸の作成
    const canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('');

    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

    const createColor = (x: number) => {
        const { r, g, b } = hsl2rgb(mix(0, 360, x), 100, mix(100, 0, x));
        return [r, g, b];
    }
    

    for (let step = 0; step < 1.0; step += 0.01) {
        const x = easeInOutQuad(step);
        const c = easeOutQuart(step);

        const [r, g, b] = createColor(c);
        gradient.addColorStop(x, createRgb(r, g, b));
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}