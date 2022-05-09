export const DefaultProvider = ({
    // header,
    navigation,
    content,
}: { 
    // header: JSX.Element;
    navigation: JSX.Element;
    content: JSX.Element;
}): JSX.Element => {
    return (
        <>
            {/* {header} */}
            <div className='flex z-0'>
                {navigation}
                {content}
            </div>
        </>
    );
};
