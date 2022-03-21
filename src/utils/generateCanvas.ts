import * as THREE from 'three';

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
