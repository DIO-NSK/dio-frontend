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

    return (
        <React.Fragment>
            <div className={cn(wrapperCV)}>
                {children}
            </div>
            <MobilePageWrapper className={classNames?.mobileWrapper}>
                {children}
            </MobilePageWrapper>
        </React.Fragment>
    );

};

export default InnerPageWrapper;
