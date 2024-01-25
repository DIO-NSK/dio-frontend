import React from "react";

export type TextInputProps = {
    placeholder : string,
    onChange ?: (value : string) => void,
    value ?: string,
    labelText ?: string,
    hintText ?: InputHint,
    inputMask ?: string,
    endDecorator ?: React.ReactNode,
    isPassword ?: boolean,
    theme ?: InputTheme,
    classNames ?: TextInputClassNames
}

type TextInputClassNames = {
    wrapper ?: string,
    input ?: string
}

type InputHint = {
    type : InputHintType,
    hintMessage : string
}

type InputHintType = "neutral" | "warning"
type InputTheme = "outlined" | "filled"