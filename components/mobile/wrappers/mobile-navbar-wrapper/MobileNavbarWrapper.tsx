import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";

const MobileNavbarWrapper = ({sticky, ...props} : {sticky ?: boolean} & WrapperProps) => {
    return (
        <section>
            <MobileNavbar sticky={sticky}/>
            <MobilePageWrapper>
                {props.children}
            </MobilePageWrapper>
        </section>
    );
};

export default MobileNavbarWrapper;
