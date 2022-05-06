import { createContext, createElement, FC, useContext } from "react";

export interface ShaderProvider {
    value: string;
}

const context = createContext<ShaderProvider>({
    value: '',
});

export const SHaderProvider: FC = ({ children }) => {
    const value = {
        value: ''
    };
    return createElement(context.Provider, { value }, children);
}

export const useShaderContext = () => useContext(context);
