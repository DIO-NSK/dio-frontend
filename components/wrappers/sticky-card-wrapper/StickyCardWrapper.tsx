import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const StickyCardWrapper = ({children, startCol} : {
    children : React.ReactNode,
    startCol : "col-start-7" | "col-start-10"
}) => {

    const wrapperCV : ClassValue[] = [
        "hidden sticky top-[120px] h-fit col-span-3 sm:flex flex-col p-[30px]",
        "rounded-xl bg-white drop-shadow-lg gap-[20px]", startCol
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    )

}

export default StickyCardWrapper
