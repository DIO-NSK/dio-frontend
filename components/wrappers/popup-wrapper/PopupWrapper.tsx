import React from 'react';
import PopupCardWrapper from "@/components/wrappers/popup-card-wrapper/PopupCardWrapper";

const PopupWrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={"fixed flex justify-center top-0 left-0 z-40 w-full h-full"}>
            <PopupCardWrapper>{children}</PopupCardWrapper>
            <div className={"w-full absolute z-10 h-screen bg-black bg-opacity-50"}/>
        </div>
    );
};

export default PopupWrapper;
