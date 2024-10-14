import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import useBreakpoint from "./useBreakpoint";

export const useResponsiveImage = ({ mainImageUrl, imageUrlDto }: ResponseCustomerBanner) => {
    const breakpoint = useBreakpoint();

    switch (breakpoint) {
        case 'xl':
        case 'inf':
            return mainImageUrl;
        case 'lg': return imageUrlDto.tabletHorizontalImageUrl;
        case 'md': return imageUrlDto.tabletVerticalImageUrl;
        default:
            return imageUrlDto.mobileImageUrl;
    }
}