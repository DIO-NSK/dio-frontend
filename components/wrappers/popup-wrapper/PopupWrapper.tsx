import React from 'react';
import PopupCardWrapper from "@/components/wrappers/popup-card-wrapper/PopupCardWrapper";

const PopupWrapper = ({children, onClose} : {
    children : React.ReactNode,
    onClose : () => void
}) => {
    return (
        <div className={"fixed flex justify-center items-center top-0 left-0 z-40 w-full h-full"}>
            <PopupCardWrapper onClose={onClose}>
                {children}
            </PopupCardWrapper>
            <div className={"w-full absolute z-10 h-screen bg-black bg-opacity-50"}/>
        </div>
    );
};

export default PopupWrapper;
