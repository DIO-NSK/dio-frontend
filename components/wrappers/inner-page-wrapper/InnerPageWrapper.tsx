import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const InnerPageWrapper = ({children, className} : {
    children : React.ReactNode,
    className ?: string
}) => {

    const wrapperCV : ClassValue[] = [
        "col-span-full px-[100px] grid grid-cols-12 gap-[30px] pb-[30px]",
        className
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    );
};

export default InnerPageWrapper;
