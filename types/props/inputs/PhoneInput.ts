import {ControlledTextInputProps, TextInputProps} from "@/types/props/inputs/TextInput";
import {FieldValues} from "react-hook-form";

export type ControlledPhoneInputProps<T extends FieldValues> = {
    inputMask ?: string
} & ControlledTextInputProps<T>

export type PhoneInputProps = {
    inputMask ?: string
} & TextInputProps