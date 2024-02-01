import React from 'react';

import {FiCheck} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type CheckboxProps = {
    isSelected: boolean,
    onSelect ?: () => void
}

const Checkbox = (props: CheckboxProps) => {

    const checkboxCV: ClassValue[] = [
        "w-6 h-5 flex items-center justify-center rounded-[5px]",
        "hoverable pointer",
        {"border-2 border-light-gray": !props.isSelected},
        {"bg-link-blue" : props.isSelected}
    ]

    return (
        <div className={cn(checkboxCV)} onClick={props.onSelect}>
            {
                props.isSelected && <FiCheck
                    className={"stroke-white stroke-[4px]"}
                    size={"14px"}
                />
            }
        </div>
    );

};

export default Checkbox;
