import React from 'react';
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";

const HeaderBlock = ({header, children} : {
    header : string,
    children : React.ReactNode
}) => {
    return (
        <div className={"col-span-9 flex flex-col gap-[20px]"}>
            <Text2XL text={header} />
            {children}
        </div>
    )
}

export default HeaderBlock
