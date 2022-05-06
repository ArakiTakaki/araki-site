export const call = <T extends (...args: any[]) => any>(cb: T, ...data: Parameters<T>) => (): ReturnType<T> => cb(...data);
