import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import {PopupProps} from "@/types/props/Popup";

type MobileNavbarWrapperProps = {
    sticky ?: boolean
} & WrapperProps & PopupProps

const MobileNavbarWrapper = ({sticky, ...props} : MobileNavbarWrapperProps) => {
    return (
        <section>
            <MobileNavbar sticky={sticky}/>
            <MobilePageWrapper className={props.className}>
                {props.children}
            </MobilePageWrapper>
        </section>
    );
};

export default MobileNavbarWrapper;
