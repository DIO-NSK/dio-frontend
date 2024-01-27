import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const SquareIcon = ({icon, className}: {
    icon: React.ReactNode,
    className ?: string
}) => {

    const iconCV: ClassValue[] = [
        "p-2 rounded-lg bg-bg-light-blue group-hover:bg-light-gray",
        "hoverable text-text-gray group-hover:text-link-blue",
        className
    ]

    return (
        <div className={cn(iconCV)}>
            {icon}
        </div>
    );

};

export default SquareIcon;
