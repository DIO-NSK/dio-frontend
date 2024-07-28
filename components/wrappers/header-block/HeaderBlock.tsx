import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

const HeaderBlock = ({header, children, className} : {
    header : string,
    children : React.ReactNode,
    className ?: string
}) => {
    return (
        <div className={cn("w-full col-span-9 flex flex-col px-5 sm:px-0 gap-3 sm:gap-5", className)}>
            <Text text={header} className={"text-[20px] sm:text-[24px] font-semibold"}/>
            {children}
        </div>
    )
}

export default HeaderBlock
