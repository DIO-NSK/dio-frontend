import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";

const HeaderBlock = ({header, children} : {
    header : string,
    children : React.ReactNode
}) => {
    return (
        <div className={"w-full col-span-9 flex flex-col px-5 sm:px-0 gap-3 sm:gap-5"}>
            <Text text={header} className={"text-[20px] sm:text-[24px] font-semibold"}/>
            {children}
        </div>
    )
}

export default HeaderBlock
