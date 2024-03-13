import React, {MouseEventHandler} from "react";

export type ButtonProps = {
    onClick : MouseEventHandler,
    text?: string,
    icon?: React.ReactNode,
    classNames?: ButtonClassnames,
    buttonType?: ButtonType,
    size ?: ButtonSize,
    disabled ?: boolean
}

type ButtonType = "PRIMARY" | "SECONDARY"
type ButtonSize = "sm" | "md"

type ButtonClassnames = {
    button?: string,
    text?: string
}