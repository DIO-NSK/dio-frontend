import React from 'react';
import {ClassValue} from "clsx";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {TextInputProps} from "@/types/props/inputs/TextInput";
import {FieldValues, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";

type InputWrapperProps<T extends FieldValues> = {
    children : React.ReactNode,
    props : TextInputProps<T>
}

const InputWrapper = <T extends FieldValues, >({children, props} : InputWrapperProps<T>) => {

    const hintTextCV: ClassValue = {
        "text-info-red": props.hintText?.type === "warning",
        "text-text-gray": props.hintText?.type === "neutral"
    }

    return (
        <ConnectForm>
            {({formState : {errors}} : UseFormReturn<T, any, T>) => (
                <div className={cn("w-full flex flex-col gap-2", props.classNames?.wrapper)}>
                    {
                        props.labelText && <Text
                            text={props.labelText}
                            className={"text-base text-black"}
                        />
                    }
                    {children}
                    {
                        errors[props.name]?.message && <Text
                            text={errors[props.name]?.message as string}
                            className={cn("text-info-red", "text-[14px]")}
                        />
                    }
                    {
                        props.hintText && <Text
                            text={props.hintText.hintMessage}
                            className={cn(hintTextCV, "text-[14px]")}
                        />
                    }
                </div>
            )}
        </ConnectForm>
    );
};

export default InputWrapper;
