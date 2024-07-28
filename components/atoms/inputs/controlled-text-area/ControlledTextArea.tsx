import React from 'react';
import {ControlledTextInputProps} from "@/types/props/inputs/TextInput";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {FieldValues, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import ControlledInputWrapper from "@/components/wrappers/input-wrapper/ControlledInputWrapper";

const ControlledTextArea = <T extends FieldValues, >({theme = "outlined", ...props}: ControlledTextInputProps<T>) => {

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between p-5 sm:px-7 sm:py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2 min-h-[150px] max-h-[300px]",
        {"bg-white": theme == "filled"},
        {"hover:bg-opacity-50": theme == "outlined"},
        props.classNames?.input
    ]

    return (
        <ConnectForm>
            {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
                <ControlledInputWrapper props={props}>
                    <textarea
                        className={cn(wrapperCV)}
                        placeholder={props.placeholder}
                        {...methods.register(props.name)}
                    />
                </ControlledInputWrapper>
            )}
        </ConnectForm>
    );

};

export default ControlledTextArea;
