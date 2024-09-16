import React from 'react';
import {cn} from "@/utlis/cn";

const ServiceCardWrapper = ({children} : {
    children : React.ReactNode
}) => {

    const wrapperCV = [
        "w-full p-5 rounded-xl sm:w-full md:p-5 xl:p-7 md:rounded-[12px] xl:rounded-2xl",
        "border-2 border-light-gray flex flex-col gap-5 xl:grid xl:grid-cols-12 xl:gap-x-[40px]"
    ]

    return (
        <div className={cn(wrapperCV)}>
            {children}
        </div>
    )
}

export default ServiceCardWrapper
