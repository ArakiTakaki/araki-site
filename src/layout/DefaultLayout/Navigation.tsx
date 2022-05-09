export const DefaultNavigation = ({ children }: { children: JSX.Element}): JSX.Element => {
    return <nav className='w-80 flex-none z-10 bg-white sticky left-0 top-0'>{ children }</nav>
};
