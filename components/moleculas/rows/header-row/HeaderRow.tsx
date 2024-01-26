import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

type HeaderRowProps = {
    header: string,
    leftContent ?: string | React.ReactNode,
    rightContent ?: React.ReactNode,
    className ?: string
}

const HeaderRow = (props : HeaderRowProps) => {
    return (
        <div className={cn("col-span-full flex flex-row items-center justify-between", props.className)}>
            <div className={"flex flex-row items-baseline gap-3"}>
                <Text text={props.header} className={"text-[24px] font-medium"}/>
                {
                    typeof props.leftContent == "string"
                        ? <Text text={props.leftContent} className={"text-base text-text-gray"}/>
                        : props.leftContent
                }
            </div>
            {props.rightContent}
        </div>
    );
};

export default HeaderRow;
