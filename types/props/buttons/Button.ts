import React, {CSSProperties, MouseEventHandler} from "react";

export type ButtonProps = {
    onClick : MouseEventHandler,
    text?: string,
    icon?: React.ReactNode,
    classNames?: ButtonClassnames,
    buttonType?: ButtonType,
    size ?: ButtonSize,
    style ?: CSSProperties,
    hasSpinner ?: boolean,
    disabled ?: boolean,
    rightContent ?: React.ReactNode
}

type ButtonType = "PRIMARY" | "SECONDARY"
type ButtonSize = "sm" | "md"

type ButtonClassnames = {
    button?: string,
    text?: string
}