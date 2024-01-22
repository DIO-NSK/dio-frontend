import React from 'react';
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";
import {useStore} from "@/store/Store";

const PopupCardWrapper = ({children}: { children: React.ReactNode }) => {

    const switchPopupState = useStore(state => state.switchPopupState)
    const handleClosePopup = () => switchPopupState(undefined)

    return (
        <div className={"z-20 absolute top-[50px] flex flex-row gap-5"}>
            <div className={"rounded-xl bg-white flex flex-col gap-[30px] p-[30px]"}>
                {children}
            </div>
            <ClosePopupButton onClose={handleClosePopup}/>
        </div>
    );
};

export default PopupCardWrapper;
