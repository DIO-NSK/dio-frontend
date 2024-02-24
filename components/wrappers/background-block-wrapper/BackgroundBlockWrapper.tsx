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
        "w-full sm:bg-bg-light-blue sm:border-2 sm:border-light-gray",
        "flex flex-col gap-3 sm:gap-5 sm:grid sm:grid-cols-2 sm:p-7 sm:rounded-xl",
        {"sm:bg-white sm:border-2 sm:border-light-gray" : theme == "outlined"}
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
