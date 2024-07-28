import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SwitchProps = {
    isSelected : boolean,
    onSelect : () => void
}

const Switch = (props : SwitchProps) => {

    const wrapperCV : ClassValue[] = [
        "relative w-[70px] h-[40px] rounded-full bg-border-gray pointer hoverable",
        {"hover:bg-gray-300" : !props.isSelected},
        {"bg-link-blue transition duration-300" : props.isSelected}
    ]

    const thumbCV : ClassValue[] = [
        "absolute top-[10px] w-5 h-5 rounded-full bg-white transition duration-150",
        {"translate-x-[10px]" : !props.isSelected}, {"translate-x-[40px]" : props.isSelected}
    ]

    return (
        <div className={cn(wrapperCV)} onClick={props.onSelect}>
            <div className={cn(thumbCV)}/>
        </div>
    );

};

export default Switch;
