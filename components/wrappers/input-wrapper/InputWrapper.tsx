import React from 'react';
import {ClassValue} from "clsx";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {TextInputProps} from "@/types/props/inputs/TextInput";

type InputWrapperProps = {
    children: React.ReactNode,
    props: TextInputProps
}

const InputWrapper = ({children, props}: InputWrapperProps) => {

    const hintTextCV: ClassValue = {
        "text-info-red": props.hintText?.type === "warning",
        "text-text-gray": props.hintText?.type === "neutral"
    }

    return (
        <div className={cn("w-full flex flex-col gap-2", props.classNames?.wrapper)}>
            {
                props.labelText && <Text
                    text={props.labelText}
                    className={"text-base text-black"}
                />
            }
            {children}
            {
                props.hintText && <Text
                    text={props.hintText.hintMessage}
                    className={cn(hintTextCV, "text-[14px]")}
                />
            }
        </div>
    );
};

export default InputWrapper;
