import React from "react";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type IconTextButtonTypes = {
    icon: React.ReactNode,
    text: string,
    onClick: () => void,
    className?: string
}

const IconTextButton = (props: IconTextButtonTypes) => {

    const wrapperCV: ClassValue = [
        "pointer hoverable hover:text-link-blue w-fit flex flex-col items-center gap-[6px]",
        props.className
    ]

    return (
        <div className={cn(wrapperCV)} onClick={props.onClick}>
            {props.icon} {props.text}
        </div>
    )
}

export default IconTextButton
