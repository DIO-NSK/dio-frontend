import { HeaderWrapperType } from "@/types/wrappers"
import { SwiperContainerProps } from "./swiper-container/SwiperContainer.types"

type Omitted = 'children' | 'hasLoop'

export interface SliderGroupProps extends HeaderWrapperType, Omit<SwiperContainerProps, Omitted> {
    desktopSlidesPerView?: number,
    mobileSlidesPerView?: number,
    headerSize?: string
    href?: string,
}