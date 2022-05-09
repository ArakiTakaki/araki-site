import { createContext, useContext } from "react";

interface DefualtLayoutContext {
    isOpen: boolean;
}

const context = createContext<DefualtLayoutContext>({
    isOpen: false,
});

export const useLayoutContext = () => useContext(context);

export const DefaultProvider = ({
    navigation,
    content,
}: { 
    navigation: JSX.Element;
    content: JSX.Element;
}): JSX.Element => {
    return (
        <context.Provider value={{ isOpen: false }}>
            <div className='md:flex z-0 relative'>
                {navigation}
                {content}
            </div>
        </context.Provider>
    );
};
