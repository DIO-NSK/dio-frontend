"use client"

import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import React from "react";
import {MobileFooter} from "./MobileFooter/MobileFooter";
import {LaptopFooter} from "./LaptopFooter/LaptopFooter";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import {VerticalTabletFooter} from "./VerticalTabletFooter/VerticalTabletFooter";
import {HorizontalTabletFooter} from "./HorizontalTabletFooter/HorizontalTabletFooter";

const wrapperCV: ClassValue[] = [
    "w-full bg-bg-light-blue",
    "py-7 px-5 lg:px-[90px] lg:py-8 xl:px-[100px] xl:py-[50px]"
]

const ResponsiveFooter = () => {
    const breakpoint = useBreakpoint();

    switch (breakpoint) {
        case 'init':
        case "sm":
            return <MobileFooter/>;
        case 'md':
            return <VerticalTabletFooter/>;
        case "lg":
            return <HorizontalTabletFooter/>;
        case "xl":
        case "inf":
            return <LaptopFooter/>;
    }
}

const Footer = () => (
    <footer className={cn(wrapperCV)}>
        <ResponsiveFooter/>
    </footer>
)

export default Footer
