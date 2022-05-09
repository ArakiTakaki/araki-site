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
                if (index === 0) return noise(current);
                return prev - noise([...current].reverse())
            }, 0);
            return calcEps(result, noiseDiff);
        }).map((val, index) => {
            if (index % 2 === 0) return -val;
            return val;
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

export const randomXorShift = (seed = 88675123) => {
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

/**
 * 0-1に変換する
 * @param t 対象数値
 * @param min 最小数値
 * @param max 最大数値
 * @returns 0-1
 * @example
 * ```
 * normalize(2, 1, 3) // => 0.5
 * ```
 */
export const normalize = (t: number, min: number, max: number): number => (t - min) / (max - min);


/**
 * @param x 導出元数値
 * @param min 最小値
 * @param max 最大値
 * @returns 最小値と最大値の間を返却する
 * @example (1.1, 0, 1) => 1
 * @example (-0.1, 0, 1) => 0
 * @example (1.1, 1, 0) => 1
 * @example (-0.1, 1, 0) => 0
 */
export const minMax = (x: number, range1: number, range2: number): number =>
  Math.min(Math.max(range2, range1), Math.max(Math.min(range2, range1), x));

/**
 * between
 * @param min 最小値
 * @param max 最大値
 * @param a ターゲットの値
 * @param offset 外部許可
 * @returns
 */
export const between = (min: number, max: number, a: number, offset = 0): boolean => a >= min - offset && a <= max + offset;

// callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any

type MapFunction<T, U> = (value: T, index: number, array: T[]) => U;
/**
 * map関数をIndexによる分割をし、順次実行する。（例　x y z ごとのポジションを変更する）
 */
export const editSplitArrayMap = <T, U>(...functions: MapFunction<T, U>[]) => (value: T, index: number, array: T[]) => {
    return functions[index % functions.length](value, Math.floor(index / functions.length), array);
};

