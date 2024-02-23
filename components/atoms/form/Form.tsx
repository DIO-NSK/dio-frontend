import React from 'react';
import {cn} from "@/utlis/cn";
import {WrapperProps} from "@/types/props/Wrapper";

type FormProps = {
    onSubmit ?: React.FormEventHandler<HTMLFormElement>
} & WrapperProps

const Form = (props: FormProps) => {
    return (
        <form
            className={cn("w-full flex flex-col gap-5 sm:gap-7", props.className)}
            onSubmit={props?.onSubmit}
        >
            {props.children}
        </form>
    );
};

export default Form;
