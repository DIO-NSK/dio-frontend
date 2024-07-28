import React from "react";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type IconTextButtonTypes = {
    icon: React.ReactNode,
    text: string,
    onClick: () => void,
    className?: string,
    placement ?: "top" | "left" | "right"
}

const IconTextButton = ({placement = "top", ...props}: IconTextButtonTypes) => {

    const wrapperCV: ClassValue[] = [
        "pointer hoverable hover:text-link-blue w-fit flex flex-col items-center gap-[6px]",
        {"flex-row" : placement == "left" || placement == "right"},
        props.className
    ]

    return (
        <div className={cn(wrapperCV)} onClick={props.onClick}>
            {
                placement == "left" || placement == "top" ? <>{props.icon}{props.text}</>
                    : <>{props.text}{props.icon}</>
            }
        </div>
    )
}

export default IconTextButton
