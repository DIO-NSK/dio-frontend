import React, {ChangeEvent} from 'react';
import {TextInputProps} from "@/types/props/inputs/TextInput";
import InputWrapper from "@/components/wrappers/input-wrapper/InputWrapper";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";

const TextArea = <T extends FieldValues, >({theme = "outlined", ...props}: TextInputProps<T>) => {

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between p-5 sm:px-7 sm:py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2 min-h-[150px] max-h-[300px]",
        {"bg-white": theme == "filled"},
        {"hover:bg-opacity-50": theme == "outlined"},
        props.classNames?.input
    ]

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange && props.onChange(event.target.value)
    }

    return (
        <ConnectForm>
            {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
                <InputWrapper props={props}>
                    <textarea
                        className={cn(wrapperCV)}
                        placeholder={props.placeholder}
                        {...methods.register(props.name as Path<T>)}
                    />
                </InputWrapper>
            )}
        </ConnectForm>
    );

};

export default TextArea;
