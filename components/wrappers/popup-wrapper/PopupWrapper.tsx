import React from 'react';
import PopupCardWrapper from "@/components/wrappers/popup-card-wrapper/PopupCardWrapper";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {PopupProps} from "@/types/props/Popup";

export type ContentClassNames = {
    wrapper ?: string,
    card ?: string
}

type PopupWrapperClassNames = {
    wrapper ?: string,
    content ?: ContentClassNames
}

type PopupWrapperProps = {
    children : React.ReactNode,
    classNames ?: PopupWrapperClassNames,
} & PopupProps

const PopupWrapper = ({placement = "default", ...props} : PopupWrapperProps) => {

    const wrapperCV : ClassValue[] = [
        "hidden fixed top-0 left-0 sm:flex justify-center z-40 w-full h-full",
        {"items-center" : placement == "center"},
        props.classNames?.wrapper
    ]

    return (
        <div className={cn(wrapperCV)}>
            <PopupCardWrapper
                classNames={props.classNames?.content}
                onClose={props.onClose}
            >
                {props.children}
            </PopupCardWrapper>
            <div className={"w-full absolute z-30 h-screen bg-black bg-opacity-50"}/>
        </div>
    );

};

export default PopupWrapper;
