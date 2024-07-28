import React, {Children} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const ShoppingCartGroupWrapper = ({children, className}: {
    children: React.ReactNode,
    className?: string
}) => {

    const childrenList = React.Children.map(children, (child, index) => {
        const childrenCV: ClassValue[] = [
            className, {
                "pb-3 sm:pb-5 border-b-2 border-light-gray": index !== Children.count(children) - 1,
                "pb-3 sm:pt-5": index != 0
            }
        ]
        return <div className={cn(childrenCV)}>{child}</div>
    })

    const mobileCV : ClassValue = "border-2 p-5 gap-3 sm:p-5 sm:gap-0"

    return (
        <div className={cn("w-full flex flex-col border-b-2 border-light-gray rounded-xl", mobileCV, className)}>
            {childrenList}
        </div>
    );
};

export default ShoppingCartGroupWrapper;
