import React from 'react';

const InnerPagesLayout = ({children}: {
    children: React.ReactNode
}) => (
    <div className={"w-full sm:mt-[10px] sm:grid sm:grid-cols-12 sm:gap-x-[30px] sm:gap-y-[30px]"}>
        {children}
    </div>
)

export default InnerPagesLayout
