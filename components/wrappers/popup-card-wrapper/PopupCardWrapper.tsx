import React from 'react';
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";
import {useStore} from "@/store/Store";
import {cn} from "@/utlis/cn";
import {ContentClassNames} from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {PopupProps} from "@/types/props/Popup";
import {ClassValue} from "clsx";

type PopupCardWrapperProps = {
    children : React.ReactNode,
    classNames ?: ContentClassNames
} & PopupProps

const PopupCardWrapper = (props : PopupCardWrapperProps) => {

    const wrapperCV : ClassValue[] = [
        "z-40 absolute top-[50px] flex flex-row gap-5",
        props.classNames?.wrapper
    ]

    const switchPopupState = useStore(state => state.switchPopupState)
    const handleClosePopup = () => {
        props.onClose ? props.onClose() : switchPopupState(undefined)
    }

    return (
        <div className={cn(wrapperCV)}>
            <div className={cn("rounded-xl bg-white flex flex-col gap-[30px] p-[30px]", props.classNames?.card)}>
                {props.children}
            </div>
            <ClosePopupButton onClose={handleClosePopup}/>
        </div>
    );
};

export default PopupCardWrapper;
