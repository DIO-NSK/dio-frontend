import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {Theme} from "@/types/props/Theme";

type BackgroundBlockWrapperProps = {
    children : React.ReactNode,
    header ?: string,
    rightContent ?: React.ReactNode,
    className ?: string,
    theme ?: Theme
}

const BackgroundBlockWrapper = ({theme = "filled", ...props} : BackgroundBlockWrapperProps) => {

    const wrapperCV : ClassValue[] = [
        "w-full bg-bg-light-blue border-2 border-light-gray",
        "grid grid-cols-2 gap-5 p-7 rounded-xl",
        {"bg-white border-2 border-light-gray" : theme == "outlined"}
    ]

    return (
        <div className={cn("w-full flex flex-col gap-4", props.className)}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                {props.header && <Text text={props.header} className={"text-lg font-medium"}/>}
                {props.rightContent}
            </div>
            <div className={cn(wrapperCV)}>
                {props.children}
            </div>
        </div>
    );
};

export default BackgroundBlockWrapper;
