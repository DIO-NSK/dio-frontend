import React from "react";

export type ButtonTypes = {
    text: string,
    onClick: () => void,
    icon?: React.ReactNode,
    classNames?: ButtonClassnames,
    buttonType?: ButtonType
}

type ButtonType = "PRIMARY" | "SECONDARY"

type ButtonClassnames = {
    button?: string,
    text?: string
}