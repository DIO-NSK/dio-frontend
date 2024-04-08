import React, {useState} from 'react';
import {ControlledTextInputProps} from "@/types/props/inputs/TextInput";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import InputMask from "react-input-mask";
import EyeButton from "@/components/atoms/buttons/eye-button/EyeButton";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {FieldValues, UseFormReturn} from "react-hook-form";
import ControlledInputWrapper from "@/components/wrappers/input-wrapper/ControlledInputWrapper";

const InnerInput = <T extends FieldValues, >(
    {theme = "outlined", ...props}: ControlledTextInputProps<T>
) => {

    const [
        isPasswordState,
        setIsPasswordState
    ] = useState<boolean>(props.isPassword ?? false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between px-5 py-4 sm:px-7 sm:py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2",
        {"sm:bg-white": theme == "filled"},
        {"hover:bg-opacity-50": theme == "outlined"},
        {"text-text-gray bg-bg-light-blue bg-opacity-50": props.disabled || props.readonly}
    ]

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key) && props.numbersOnly) event.preventDefault()
    }

    return (
        <ConnectForm>
            {(methods: UseFormReturn<T, any, T>) => (
                <div className={"w-full relative"}>
                    {
                        props.inputMask ? <InputMask
                                mask={props.inputMask}
                                className={cn(wrapperCV)}
                                placeholder={props.placeholder}
                                {...methods?.register?.(props.name)}
                            /> :
                            <input
                                {...methods?.register?.(props.name)}
                                readOnly={props?.readonly}
                                disabled={props.disabled}
                                onClick={props.onClick}
                                onKeyPress={handleKeyPress}
                                type={isPasswordState ? "password" : "text"}
                                className={cn(wrapperCV)}
                                placeholder={props.placeholder}
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
            )}
        </ConnectForm>
    )

}

const ControlledTextInput = <T extends FieldValues, >(props: ControlledTextInputProps<T>) => {
    return (
        <ControlledInputWrapper props={props}>
            <InnerInput {...props}/>
        </ControlledInputWrapper>
    )
};

export default ControlledTextInput;

