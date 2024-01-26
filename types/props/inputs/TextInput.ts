import React from "react";
import {Theme} from "@/types/props/Theme";

export type TextInputProps = {
    placeholder : string,
    onChange ?: (value : string) => void,
    value ?: string,
    labelText ?: string,
    hintText ?: InputHint,
    inputMask ?: string,
    endDecorator ?: React.ReactNode,
    isPassword ?: boolean,
    theme ?: Theme,
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