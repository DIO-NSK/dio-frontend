import React from 'react';
import {PopupProps} from "@/types/props/Popup";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiX} from "react-icons/fi";

const ClosePopupButton = (props : PopupProps) => {

    const wrapperCV : ClassValue[] = [
        "mt-7 flex justify-center items-center w-8 h-8",
        "rounded-full bg-bg-light-blue pointer hoverable",
        "hover:text-link-blue hover:drop-shadow-lg text-text-gray"
    ]

    return (
        <div
            className={cn(wrapperCV)}
            onClick={props.onClose}
        >
            <FiX size={"20px"}/>
        </div>
    );
};

export default ClosePopupButton;
