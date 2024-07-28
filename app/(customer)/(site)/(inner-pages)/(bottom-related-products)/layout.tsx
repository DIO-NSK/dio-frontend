import React from 'react';

const BottomRelatedProductsLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className={"w-full flex flex-col gap-5 sm:col-span-full sm:gap-[40px]"}>
            {children}
        </div>
    )
}

export default BottomRelatedProductsLayout;
