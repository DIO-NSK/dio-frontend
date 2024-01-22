import React from 'react';
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";

const PopupCardWrapper = ({children, onClose}: {
    children: React.ReactNode,
    onClose: () => void
}) => {
    return (
        <div className={"z-20 absolute flex flex-row gap-5"}>
            <div className={"rounded-xl bg-white flex flex-col gap-[30px] p-[30px]"}>
                {children}
            </div>
            <ClosePopupButton onClose={onClose}/>
        </div>
    );
};

export default PopupCardWrapper;
