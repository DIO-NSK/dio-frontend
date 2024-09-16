import React from "react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const wrapperCV: ClassValue[] = [
    "px-5 flex flex-col gap-5",
    "col-span-full md:grid md:pb-7 md:grid-cols-12",
    "md:px-[24px] md:gap-5",
    "lg:px-[90px]",
    "xl:px-[100px] xl:gap-7"
]

export const ResponsivePageWrapper = ({children, className}: { children: React.ReactNode, className ?: string }) => (
    <section className={cn(wrapperCV, className)}>
        {children}
    </section>
);