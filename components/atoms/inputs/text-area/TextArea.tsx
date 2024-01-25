import React, {ChangeEvent} from 'react';
import {TextInputProps} from "@/types/props/inputs/TextInput";
import InputWrapper from "@/components/wrappers/input-wrapper/InputWrapper";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const TextArea = ({theme = "outlined", ...props} : TextInputProps) => {

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between px-7 py-5 rounded-xl bg-bg-light-blue",
        "hoverable focus:outline-0 border-light-gray border-2",
        {"bg-white" : theme == "filled"},
        {"hover:bg-opacity-50" : theme == "outlined"},
        props.classNames?.input
    ]

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange && props.onChange(event.target.value)
    }

    return (
        <InputWrapper props={props}>
            <textarea
                className={cn(wrapperCV)}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={props.value}
            />
        </InputWrapper>
    );

};

export default TextArea;
