import { useMemo } from "react"
import { randomXorShift } from "../utils/math";


export const useRandom = (seed?: number) => {
     const random = useMemo(() => {
        return randomXorShift(seed);
    }, [seed]);
    return random;
}