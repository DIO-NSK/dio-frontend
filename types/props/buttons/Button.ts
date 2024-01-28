import React from "react";

export type ButtonTypes = {
    text: string,
    onClick: () => void,
    icon?: React.ReactNode,
    classNames?: ButtonClassnames,
    buttonType?: ButtonType,
    size ?: ButtonSize
}

type ButtonType = "PRIMARY" | "SECONDARY"
type ButtonSize = "sm" | "md"

type ButtonClassnames = {
    button?: string,
    text?: string
}