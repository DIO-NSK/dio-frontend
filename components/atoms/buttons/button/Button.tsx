import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {ButtonTypes} from "@/types/props/buttons/Button";

const Button = ({buttonType = "PRIMARY", size = "md", disabled = false, ...props}: ButtonTypes): React.ReactNode => {

    const buttonSizeCV: ClassValue = {
        "px-5 sm:px-4 py-3 gap-2": size == "sm",
        "px-[50px] py-4 gap-[15px]": size == "md"
    }

    const buttonTypeCV: ClassValue = {
        "bg-link-blue text-white hover:bg-blue-800": buttonType === "PRIMARY",
        "bg-light-gray text-link-blue hover:bg-blue-100": buttonType === "SECONDARY"
    }

    const buttonCV: ClassValue[] = [
        "flex flex-row items-center",
        "justify-center rounded-xl whitespace-nowrap",
        "hover:duration-200 transition pointer text-base",
        buttonTypeCV, buttonSizeCV, props.classNames?.button,
        {"bg-bg-light-blue text-text-gray": disabled}
    ]

    return (
        <button
            disabled={disabled}
            className={cn(buttonCV)}
            onClick={props.onClick}
        >
            {props.icon}
            {props?.text}
        </button>
    )

}

export default Button
