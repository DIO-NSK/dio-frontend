import React from 'react';
import {PopupProps} from "@/types/props/Popup";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiX} from "react-icons/fi";

const ClosePopupButton = ({className, ...props}: PopupProps & { className ?: string }) => {

    const wrapperCV: ClassValue[] = [
        "mt-7 flex justify-center items-center w-9 h-9",
        "rounded-full bg-bg-light-blue pointer hoverable",
        "hover:text-link-blue hover:drop-shadow-lg text-text-gray"
    ]

    return (
        <div
            className={cn(wrapperCV, className)}
            onClick={props.onClose}
        >
            <FiX size={"20px"}/>
        </div>
    );
};

export default ClosePopupButton;
