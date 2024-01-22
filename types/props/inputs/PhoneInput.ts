import {TextInputProps} from "@/types/props/inputs/TextInput";

export type PhoneInputProps = {
    inputMask : string | (string | RegExp)[]
} & TextInputProps