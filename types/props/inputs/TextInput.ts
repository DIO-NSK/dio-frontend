import React from "react";
import {Theme} from "@/types/props/Theme";
import {FieldValues} from "react-hook-form";

export type TextInputProps<T extends FieldValues> = {
    placeholder : string,
    onChange ?: (value : string) => void,
    value ?: string,
    labelText ?: string,
    hintText ?: InputHint,
    inputMask ?: string,
    endDecorator ?: React.ReactNode,
    isPassword ?: boolean,
    theme ?: Theme,
    classNames ?: TextInputClassNames,
    disabled ?: string,
    numbersOnly ?: boolean,
    name ?: keyof T
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