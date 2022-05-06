import React, {FC} from 'react';
import { useThreeContext } from '../ThreeContext';
import { useShader } from './uses/useShader';

export const ShaderEffect: FC = () => {
    const { scene } = useThreeContext();

    const [mesh] = useShader({
        fragmentShader: '',
        vertexShader: '',
    });

    return <></>;
};
