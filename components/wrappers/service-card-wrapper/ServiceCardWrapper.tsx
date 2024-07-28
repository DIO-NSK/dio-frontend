import React from 'react';
import {cn} from "@/utlis/cn";

const ServiceCardWrapper = ({children} : {
    children : React.ReactNode
}) => {

    const wrapperCV = [
        "w-full p-5 rounded-xl sm:w-full sm:p-7 sm:rounded-2xl",
        "border-2 border-light-gray flex flex-col gap-5 sm:grid sm:grid-cols-12 sm:gap-x-[40px]"
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    )
}

export default ServiceCardWrapper
