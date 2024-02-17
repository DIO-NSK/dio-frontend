import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";

const MobileSliderWrapper = (props : WrapperProps) => {
    return (
        <div className={"w-full overflow-auto"}>
            <div className={"w-fit px-5 sm:hidden flex flex-row gap-3"}>
                {props.children}
            </div>
        </div>
    );
};

export default MobileSliderWrapper;
