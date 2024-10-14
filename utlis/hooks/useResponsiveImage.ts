import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { breakpoints, BreakpointsKey, BreakpointsValue } from "@/constants";
import { useEffect, useState } from "react";

interface Size {
    width: number | undefined;
    height: number | undefined;
}

const BREAKPOINTS = {
    init: 0,
    sm: 360,
    md: 768,
    lg: 1024,
    xl: 1440,
    inf: 9999
}

const findBreakpoint = (width: number): BreakpointsValue => {
    const keys = Object.keys(breakpoints);

    for (let index = 0; index < keys.length - 1; index++) {
        if (Number(keys[index]) <= width && width < Number(keys[index + 1])) {
            return breakpoints[Number(keys[index]) as BreakpointsKey] as BreakpointsValue;
        }
    }

    return 'init';
}

const useOldBreakpoint = () => {
    const initBreakpoint = findBreakpoint(window.innerWidth);
    const [breakpoint, setBreakPoint] = useState<BreakpointsValue>(initBreakpoint);
    const [windowSize, setWindowSize] = useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        if (windowSize?.width) {
            setBreakPoint(findBreakpoint(windowSize.width))
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize.width]);

    return breakpoint;
};

export const useResponsiveImage = ({ mainImageUrl, imageUrlDto }: ResponseCustomerBanner) => {
    const breakpoint = useOldBreakpoint();

    switch (breakpoint) {
        case 'xl':
        case 'inf':
            return mainImageUrl;
        case 'lg':
            return imageUrlDto.tabletHorizontalImageUrl;
        case 'md':
            return imageUrlDto.tabletVerticalImageUrl;
        default:
            return imageUrlDto.mobileImageUrl;
    }
}