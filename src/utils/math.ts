import Simplex from 'simplex-noise';

interface NoiseOptions {
    noiseDiff?: number;
}

export const parseSimplecNoise = (instance: Simplex) => (args: number[]): number => {
    if (args.length === 1) throw new Error('fuck you');
    if (args.length === 2) return instance.noise2D(args[0], args[1]);
    if (args.length === 3) return instance.noise3D(args[0], args[1], args[2]);
    return instance.noise4D(args[0], args[1], args[2], args[3]);
}

export const createCurlNoise = (noise: (vlaues: number[]) => number) => {
    return (values: number[], options?: NoiseOptions) => {
        const {
            noiseDiff = 0.01,
        } = options || {};

        return values.map((_, index) => {
            // 誤差A
            const a = values.map((value, target) => {
                if (target === index) {
                    return [
                        value - noiseDiff,
                        value + noiseDiff,
                    ];
                }
                return [
                    value,
                    value,
                ];
            });

            const result = a.reduce((prev, current, index) => {
                if (index === 0) return  noise(current);
                return prev - noise(current)
            }, 0);
            return calcEps(result, noiseDiff);
        });
    };
}

function calcEps(a: number, inv: number) {
    return a * (1.0 / (2 * inv));
}

/**
 * @param t1 - 開始地点
 * @param t2 - 終了地点
 * @param a - 経過 (0-1)
 * @returns t1とt2のa線形補完
 */
export const mix = (t1: number, t2: number, a: number) => t1 * (1 - a) + t2 * a;

export const randomXorShift = (seed: number = 88675123) => {
    let w = seed;
    let x = 123456789;
    let y = 362436069;
    let z = 521288629;
    return (min = 0, max = 1) => {
        const t = x ^ (x << 11);
        x = y;
        y = z;
        z = w;
        w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));

        const r = Math.abs(w)
        return min + (r % (max + 1 - min));
    };
};
