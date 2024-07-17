import React from 'react';
import {cn} from "@/utlis/cn";

type ChipProps = {
    className?: string,
    onClick?: () => void,
    activeIndex?: number,
    children: React.ReactNode,
    icon?: React.ReactNode
}

const chipStyles = "flex w-fit flex-row items-center gap-2 px-3 py-2 rounded-md bg-light-gray";

const Chip = (props: ChipProps) => {
    return (
        <li
            onClick={props.onClick}
            className={cn(chipStyles, props.className)}
            data-active-index={props.activeIndex}
        >
            {props.icon}
            {props.children}
        </li>
    );
};

export default Chip;