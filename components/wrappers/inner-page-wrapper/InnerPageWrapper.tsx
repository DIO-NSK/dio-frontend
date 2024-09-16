import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import {BREAKPOINT_MOBILE} from "@/constants";

type InnerPageWrapperClassNames = {
    mobileWrapper?: string,
    desktopWrapper?: string
}

const InnerPageWrapper = ({children, classNames}: {
    children: React.ReactNode,
    classNames?: InnerPageWrapperClassNames
}) => {

    const wrapperCV: ClassValue[] = [
        "col-span-full md:grid md:pb-7 md:grid-cols-12",
        "md:px-[24px] md:gap-5",
        "lg:px-[90px]",
        "xl:px-[100px] xl:gap-7",
        classNames?.desktopWrapper
    ]

    const isMobile = typeof window !== 'undefined' && window.innerWidth < BREAKPOINT_MOBILE;

    return (
        <React.Fragment>
            {!isMobile ? <div className={cn(wrapperCV)}>
                {children}
            </div> : null}
            {isMobile ? <MobilePageWrapper className={classNames?.mobileWrapper}>
                {children}
            </MobilePageWrapper> : null}
        </React.Fragment>
    );

};

export default InnerPageWrapper;
