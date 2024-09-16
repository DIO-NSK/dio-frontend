import React, {forwardRef} from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {ButtonProps} from "@/types/props/buttons/Button";
import {CircularProgress} from "@mui/joy";


const Button = forwardRef<HTMLButtonElement, ButtonProps>((
    {
        buttonType = "PRIMARY", hasSpinner = true,
        size = "md", disabled = false,
        ...props
    }: ButtonProps,
    ref
) => {

    const buttonSizeCV: ClassValue = {
        "px-5 px-4 py-3 gap-2": size == "sm",
        "px-6 py-4 xl:px-[50px] gap-[15px]": size == "md"
    }

    const buttonTypeCV: ClassValue = {
        "bg-link-blue text-white sm:hover:bg-blue-800": buttonType === "PRIMARY",
        "bg-light-gray text-link-blue sm:hover:bg-blue-100": buttonType === "SECONDARY"
    }

    const buttonCV: ClassValue[] = [
        "flex flex-row items-center",
        "justify-center rounded-xl whitespace-nowrap",
        "sm:hover:duration-200 transition duration-200 pointer text-base",
        buttonTypeCV, buttonSizeCV,
        {"bg-bg-light-blue text-text-gray border-2 border-light-gray": disabled},
        {"sm:hover:bg-bg-light-blue sm:hover:text-text-gray sm:hover:border-2": disabled},
        {"sm:hover:border-light-gray sm:hover:cursor-not-allowed": disabled},
        props.classNames?.button,
    ]


    return (
        <button
            ref={ref}
            type={"button"}
            disabled={disabled}
            className={cn(buttonCV)}
            {...props}
        >
            <div className={cn('flex flex-row items-center gap-2', {
                'gap-[15px]': size === 'md'
            })}>
                {props.icon}
                {props?.text}
            </div>
            {props?.rightContent}
            {disabled && hasSpinner && <CircularProgress variant={"soft"} size={"sm"}/>}
        </button>
    )

})

export default Button
