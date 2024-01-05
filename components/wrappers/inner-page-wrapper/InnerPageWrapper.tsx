import React from 'react';
import {cn} from "@/utlis/cn";

const InnerPageWrapper = ({children, className} : {
    children : React.ReactNode,
    className ?: string
}) => {
    return (
        <div
            style={{padding: "0 100px 0 100px"}}
            className={cn("col-span-full grid grid-cols-12 gap-[30px] mb-[30px]", className)}
        >
            {children}
        </div>
    );
};

export default InnerPageWrapper;
