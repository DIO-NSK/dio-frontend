import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type CheckoutBlockWrapperProps = {
    header : string,
    children : React.ReactNode,
    rightContent ?: React.ReactNode,
}

const CheckoutBlockWrapper = (props : CheckoutBlockWrapperProps) => {

    const wrapperCV : ClassValue[] = [
        "w-full bg-bg-light-blue border-2 border-light-gray",
        "grid grid-cols-2 gap-5 p-7 rounded-xl"
    ]

    return (
        <div className={"w-full flex flex-col gap-4"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={props.header} className={"text-lg font-medium"}/>
                {props.rightContent}
            </div>
            <div className={cn(wrapperCV)}>
                {props.children}
            </div>
        </div>
    );
};

export default CheckoutBlockWrapper;
