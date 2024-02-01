import React, {ChangeEvent, useState} from 'react';
import {TextInputProps} from "@/types/props/inputs/TextInput";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {PhoneInputProps} from "@/types/props/inputs/PhoneInput";
import InputMask from "react-input-mask";
import EyeButton from "@/components/atoms/buttons/eye-button/EyeButton";
import InputWrapper from "@/components/wrappers/input-wrapper/InputWrapper";

const InnerInput = ({theme = "outlined", ...props}: TextInputProps | PhoneInputProps) => {

    const [
        isPasswordState,
        setIsPasswordState
    ] = useState<boolean>(props.isPassword ?? false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between px-7 py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2",
        {"bg-white" : theme == "filled"},
        {"hover:bg-opacity-50" : theme == "outlined"}
    ]

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event.target.value)
    }

    const handleKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key) && props.numbersOnly) event.preventDefault()
    }

    return (
        <div className={"w-full relative"}>
            {
                props.inputMask ? <InputMask
                        mask={props.inputMask}
                        value={props.value}
                        onChange={handleChange}
                    >
                        {
                            (inputProps) => <input
                                className={cn(wrapperCV)}
                                placeholder={props.placeholder}
                                {...inputProps}
                            />
                        }
                    </InputMask> :
                    <input
                        onKeyPress={handleKeyPress}
                        type={isPasswordState ? "password" : "text"}
                        className={cn(wrapperCV)}
                        placeholder={props.placeholder}
                        onChange={handleChange}
                        value={props.value}
                    />
            }
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

const TextInput = (props: TextInputProps | PhoneInputProps) => {
    return (
        <InputWrapper props={props}>
            <InnerInput {...props}/>
        </InputWrapper>
    )
};

export default TextInput;
