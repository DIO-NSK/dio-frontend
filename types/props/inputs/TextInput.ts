import React from "react";
import {Theme} from "@/types/props/Theme";
import {FieldValues, Path} from "react-hook-form";

export type ControlledTextInputProps<T extends FieldValues> = { name: Path<T> }
    & Omit<TextInputProps, "onChange" | "value">

export type TextInputProps = {
    placeholder: string,
    onChange?: (value: string) => void,
    onClick?: () => void,
    value?: string,
    labelText?: string,
    hintText?: InputHint,
    inputMask?: string,
    endDecorator?: React.ReactNode,
    isPassword?: boolean,
    theme?: Theme,
    classNames?: TextInputClassNames,
    disabled?: boolean,
    numbersOnly?: boolean,
}

type TextInputClassNames = {
    wrapper?: string,
    input?: string
}

type InputHint = {
    type: InputHintType,
    hintMessage: string
}

type InputHintType = "neutral" | "warning"