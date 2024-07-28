import React from 'react';
import {cn} from "@/utlis/cn";

const PageContentWrapper = ({children} : {children : React.ReactNode}) => {

    const wrapperCV = [
        "w-full flex flex-col gap-3 sm:grid sm:grid-cols-9",
        "sm:col-span-9 sm:mb-7 sm:gap-x-5 sm:gap-y-7"
    ]

    return (
        <section className={cn(wrapperCV)}>
            {children}
        </section>
    );

};

export default PageContentWrapper;