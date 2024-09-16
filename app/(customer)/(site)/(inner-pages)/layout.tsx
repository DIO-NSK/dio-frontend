import React from 'react';

const InnerPagesLayout = ({children}: {
    children: React.ReactNode
}) => (
    <div className={"w-full md:mt-[10px] md:grid md:grid-cols-12 md:gap-5 xl:gap-x-[30px] xl:gap-y-[30px]"}>
        {children}
    </div>
)

export default InnerPagesLayout
