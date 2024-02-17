import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const ServiceBlockWrapper = ({header, children} : {
    header : string,
    children : React.ReactNode
}) => {

    const wrapperCV = [
        "w-full flex flex-col gap-5 sm:grid grid-cols-6 gap-x-[30px]",
        "sm:gap-y-[20px] pb-5 border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <div className={"sm:col-span-full w-full"}>
                <Text text={header} className={"text-[18px] font-medium"}/>
            </div>
            {children}
        </div>
    )
}

export default ServiceBlockWrapper
