import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";

type InnerPageWrapperClassNames = {
    mobileWrapper ?: string,
    desktopWrapper ?: string
}

const InnerPageWrapper = ({children, classNames} : {
    children : React.ReactNode,
    classNames ?: InnerPageWrapperClassNames
}) => {

    const wrapperCV : ClassValue[] = [
        "hidden col-span-full px-[100px] sm:grid grid-cols-12 gap-7 pb-7",
        classNames?.desktopWrapper
    ]

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <React.Fragment>
            <div className={cn(wrapperCV)}>
                {!isMobile ? children : null}
            </div>
            <MobilePageWrapper className={classNames?.mobileWrapper}>
                {isMobile ? children : null}
            </MobilePageWrapper>
        </React.Fragment>
    );

};

export default InnerPageWrapper;
