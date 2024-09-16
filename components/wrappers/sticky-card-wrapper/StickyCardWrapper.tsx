import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const StickyCardWrapper = ({children, startCol} : {
    children : React.ReactNode,
    startCol : string
}) => {

    const wrapperCV : ClassValue[] = [
        "hidden sticky top-[120px] h-fit col-span-3 md:flex flex-col p-7",
        "rounded-xl bg-white shadow-xl shadow-gray-200/50 border-2 border-light-gray gap-[20px]",
        startCol
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    )

}

export default StickyCardWrapper
