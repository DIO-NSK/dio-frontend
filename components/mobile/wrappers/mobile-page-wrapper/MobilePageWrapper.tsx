import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import {cn} from "@/utlis/cn";

const MobilePageWrapper = (props : WrapperProps) => {
    return (
        <section className={cn("sm:hidden px-5 py-7 w-full flex flex-col gap-7 bg-white", props.className)}>
            {props.children}
        </section>
    );
};

export default MobilePageWrapper;
