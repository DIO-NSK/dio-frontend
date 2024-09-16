import React from 'react';
import {cn} from "@/utlis/cn";

const PageContentWrapper = ({children} : {children : React.ReactNode}) => {

    const wrapperCV = [
        "w-full flex flex-col gap-3 md:grid md:grid-cols-9",
        "md:col-span-9 md:mb-7 md:gap-x-5 md:gap-y-7"
    ]

    return (
        <section className={cn(wrapperCV)}>
            {children}
        </section>
    );

};

export default PageContentWrapper;