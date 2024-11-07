"use client"

import { ResponsiveContainer } from "@/components/wrappers/responsive-container/ResponsiveContainer";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { HorizontalTabletFooter } from "./HorizontalTabletFooter/HorizontalTabletFooter";
import { LaptopFooter } from "./LaptopFooter/LaptopFooter";
import { MobileFooter } from "./MobileFooter/MobileFooter";
import { VerticalTabletFooter } from "./VerticalTabletFooter/VerticalTabletFooter";

const ResponsiveFooter = () => {
    const breakpoint = useOldBreakpoint();

    if (breakpoint === 'init' || breakpoint === 'sm') {
        return <MobileFooter />;
    }

    if (breakpoint === 'md') {
        return <VerticalTabletFooter />;
    }

    if (breakpoint === 'lg') {
        return <HorizontalTabletFooter />;
    }

    return <LaptopFooter />;
}

const Footer = () => (
    <ResponsiveContainer className="bg-bg-light-blue">
        <footer className={"w-full py-7 px-5 lg:px-0 lg:py-8 xl:px-0 xl:py-[50px]"}>
            <ResponsiveFooter />
        </footer>
    </ResponsiveContainer>
)

export default Footer
