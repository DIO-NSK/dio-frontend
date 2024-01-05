import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {ButtonTypes} from "@/types/props/Button";

const Button = ({buttonType = "PRIMARY", ...props}: ButtonTypes): React.ReactNode => {

    const buttonTypeCV: ClassValue = {
        "bg-link-blue text-white hover:bg-blue-800": buttonType === "PRIMARY",
        "bg-light-gray text-link-blue hover:bg-blue-100": buttonType === "SECONDARY"
    }

    const buttonCV: ClassValue[] = [
        "px-[50px] py-[20px] flex flex-row gap-[15px] items-center",
        "justify-center rounded-xl whitespace-nowrap",
        "hover:duration-200 transition pointer text-base",
        buttonTypeCV
    ]

    return (
        <div className={cn(buttonCV)} onClick={props.onClick}>
            {props.icon}
            {props.text}
        </div>
    )

}

export default Button
