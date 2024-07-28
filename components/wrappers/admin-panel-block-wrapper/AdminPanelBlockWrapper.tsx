import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const AdminPanelBlockWrapper = (props: WrapperProps) => {

    const wrapperCV: ClassValue[] = [
        "w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7",
        "border-b-2 border-light-gray", props.className
    ]

    return (
        <div className={cn(wrapperCV)}>
            {props.children}
        </div>
    );

};

export default AdminPanelBlockWrapper;
