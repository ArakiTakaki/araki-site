export const DefaultProvider = ({
    navigation,
    content,
}: { 
    navigation: JSX.Element;
    content: JSX.Element;
}): JSX.Element => {
    return (
        <>
            <div className='flex z-0'>
                {navigation}
                {content}
            </div>
        </>
    );
};
