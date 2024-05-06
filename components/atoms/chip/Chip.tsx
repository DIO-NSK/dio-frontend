import React from 'react';
import {cn} from "@/utlis/cn";

type ChipProps = {
    className?: string,
    children: React.ReactNode,
    icon?: React.ReactNode
}

const Chip = (props: ChipProps) => {
    return (
        <div className={cn("flex w-fit flex-row items-center gap-2 px-3 py-2 rounded-md bg-light-gray", props.className)}>
            {props.icon}
            {props.children}
        </div>
    );
};

export default Chip;