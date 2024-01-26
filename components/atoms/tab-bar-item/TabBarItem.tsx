import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

const TabBarItem = (props : TabBarItemProps) => {

    const wrapperCV : ClassValue[] = [
        "w-full flex flex-row gap-3 items-center px-4 py-4 text-base rounded-xl hoverable pointer",
        "hover:bg-bg-light-blue",
        {
            "bg-bg-light-blue text-link-blue" : props.isActive,
            "bg-white text-black" : !props.isActive
        }
    ]

    return (
        <div
            className={cn(wrapperCV)}
            onClick={() => props.setActive(props.tab)}
        >
            {props.tab.icon}
            {props.tab.text}
        </div>
    )

}

export default TabBarItem;
