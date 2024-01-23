import React from 'react';
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";
import {useStore} from "@/store/Store";
import {cn} from "@/utlis/cn";
import {ContentClassNames} from "@/components/wrappers/popup-wrapper/PopupWrapper";

type PopupCardWrapperProps = {
    children : React.ReactNode,
    onClose ?: () => void,
    classNames ?: ContentClassNames
}

const PopupCardWrapper = (props : PopupCardWrapperProps) => {

    const switchPopupState = useStore(state => state.switchPopupState)
    const handleClosePopup = () => {
        props.onClose ? props.onClose() : switchPopupState(undefined)
    }

    return (
        <div className={cn("z-20 absolute top-[50px] flex flex-row gap-5", props.classNames?.wrapper)}>
            <div className={cn("rounded-xl bg-white flex flex-col gap-[30px] p-[30px]", props.classNames?.card)}>
                {props.children}
            </div>
            <ClosePopupButton onClose={handleClosePopup}/>
        </div>
    );
};

export default PopupCardWrapper;
