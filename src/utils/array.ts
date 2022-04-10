
export const range = (len: number) => (new Array(len)).fill(0).map((_, index) => index);
/**
 * @param arr
 * @param length
 * @returns
 */
export const rough = <T>(arr: ArrayLike<T>, length: number) => {
    const number: T[][] = [];
    for (let i = 0; i < arr.length; i += length) {
        number[number.length] = [];
        for (let j = 0; j < length; j ++ ) {
            if (arr[i + j] == null) continue;
            number[number.length - 1].push(arr[i + j]);
        }
    }
    return number;
};