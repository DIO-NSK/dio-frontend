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
                "pb-5 border-b-2 border-light-gray": index !== Children.count(children) - 1,
                "pt-5": index != 0
            }
        ]
        return <div className={cn(childrenCV)}>{child}</div>
    })

    return (
        <div className={cn("w-full flex flex-col pb-10 border-b-2 border-light-gray", className)}>
            {childrenList}
        </div>
    );
};

export default ShoppingCartGroupWrapper;
