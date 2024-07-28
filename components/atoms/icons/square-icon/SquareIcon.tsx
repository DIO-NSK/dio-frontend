import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {IconButton} from "@/types/props/buttons/IconButton";

const SquareIcon = (props : IconButton) => {

    const iconCV: ClassValue[] = [
        "p-2 rounded-lg bg-bg-light-blue group-hover:bg-light-gray",
        "hoverable text-text-gray group-hover:text-link-blue hover:cursor-pointer",
        props.className
    ]

    return (
        <div onClick={props.onClick} className={cn(iconCV)}>
            {props.icon}
        </div>
    );

};

export default SquareIcon;
