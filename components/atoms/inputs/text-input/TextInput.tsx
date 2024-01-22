import React, {ChangeEvent, useState} from 'react';
import {TextInputProps} from "@/types/props/inputs/TextInput";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {PhoneInputProps} from "@/types/props/inputs/PhoneInput";
import InputMask from "react-input-mask";
import EyeButton from "@/components/atoms/buttons/eye-button/EyeButton";

const InnerInput = (props: TextInputProps | PhoneInputProps) => {

    const [
        isPasswordState,
        setIsPasswordState
    ] = useState<boolean>(props.isPassword ?? false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between px-7 py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 hover:bg-opacity-50 border-light-gray border-2"
    ]

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event.target.value)
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

    const hintTextCV: ClassValue = {
        "text-info-red": props.hintText?.type === "warning",
        "text-text-gray": props.hintText?.type === "neutral"
    }

    return (
        <div className={"w-full flex flex-col gap-2"}>
            {
                props.labelText && <Text
                    text={props.labelText}
                    className={"text-base text-black"}
                />
            }
            <InnerInput {...props}/>
            {
                props.hintText && <Text
                    text={props.hintText.hintMessage}
                    className={cn(hintTextCV, "text-[14px]")}
                />
            }
        </div>
    );
};

export default TextInput;
