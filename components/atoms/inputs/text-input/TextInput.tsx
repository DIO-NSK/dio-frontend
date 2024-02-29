import React, {ChangeEvent, useState} from 'react';
import {TextInputProps} from "@/types/props/inputs/TextInput";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import EyeButton from "@/components/atoms/buttons/eye-button/EyeButton";
import InputWrapper from "@/components/wrappers/input-wrapper/InputWrapper";

const InnerInput = ({theme = "outlined", ...props}: TextInputProps) => {

    const [
        isPasswordState,
        setIsPasswordState
    ] = useState<boolean>(props.isPassword ?? false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between px-5 py-4 sm:px-7 sm:py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2",
        {"sm:bg-white": theme == "filled"},
        {"hover:bg-opacity-50": theme == "outlined"},
        {"text-text-gray bg-bg-light-blue bg-opacity-50": props.disabled}
    ]

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event.target.value)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key) && props.numbersOnly) event.preventDefault()
    }

    return (
        <div className={"w-full relative"}>
            <input
                onChange={handleChange}
                value={props.value}
                className={cn(wrapperCV)}
                placeholder={props.placeholder}
            />
            <div className={"absolute z-10 top-1/3 right-7"}>
                {!props.isPassword && props.endDecorator}
                {
                    props.isPassword && <EyeButton
                        isOpen={isPasswordState}
                        setOpen={setIsPasswordState}
                    />
                }
            </div>
        </div>
    )

}

const TextInput = (props: TextInputProps) => {
    return (
        <InputWrapper props={props}>
            <InnerInput {...props}/>
        </InputWrapper>
    )
};

export default TextInput;
