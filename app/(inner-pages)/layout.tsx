import React from 'react';

const InnerPagesLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className={"w-full mt-[10px] grid grid-cols-12 gap-x-[30px] gap-y-[30px]"}>
            {children}
        </div>
    )
}

export default InnerPagesLayout
