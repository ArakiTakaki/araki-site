import { BaseIcon } from "../../components/common/BaseIcon";

export const DefaultContent = ({ children }: { children: JSX.Element}): JSX.Element => {
    
    return (
        <main className='w-full min-h-screen relative max-w-full overflow-x-hidden'>
            { children }
        </main>
    );
};

