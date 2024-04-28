import React, {useRef} from "react";
import {HeaderWrapperType} from "@/types/wrappers";
import Text from "@/components/atoms/text/text-base/Text";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import {cn} from "@/utlis/cn";

import {Autoplay, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {type Swiper as SwiperRef} from 'swiper'

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import SlideButton from "@/components/atoms/buttons/slide-button/SlideButton";
import {Side} from "@/data/enums/side";
import {AUTOPLAY_DELAY, DESKTOP_SLIDES_PER_VIEW, MOBILE_SLIDES_PER_VIEW} from "@/constants/swiper";

const MOBILE_BREAKPOINT = 768

type SliderGroupProps = {
    desktopSlidesPerView?: number,
    mobileSlidesPerView?: number
} & HeaderWrapperType

const SliderGroup = (
    {
        desktopSlidesPerView = DESKTOP_SLIDES_PER_VIEW,
        mobileSlidesPerView = MOBILE_SLIDES_PER_VIEW,
        ...props
    }: SliderGroupProps
) => {

    if (typeof window === 'undefined') return

    const swiperRef = useRef<SwiperRef>()

    const isMobile = window.screen.width <= MOBILE_BREAKPOINT
    const slidesPerView = isMobile ? mobileSlidesPerView : desktopSlidesPerView
    const spacing = isMobile ? 12 : 20

    return (
        <section id={props.id} className={cn("sm:pl-0 w-full flex flex-col gap-5 sm:gap-7", props.className)}>
            <div className={"px-5 sm:px-0 col-span-full flex flex-row justify-between items-center"}>
                {props.header && <Text
                    className={"text-[20px] sm:text-[32px] font-bold leading-none"}
                    text={props.header}
                />}
                <div className={"hidden sm:flex flex-row items-center gap-[20px]"}>
                    <SlideButton side={Side["LEFT"]} onClick={() => swiperRef.current?.slidePrev()}/>
                    <SlideButton side={Side["RIGHT"]} onClick={() => swiperRef.current?.slideNext()}/>
                </div>
            </div>
            <Swiper
                loop={true}
                grabCursor={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                className={"active:cursor-grab hidden w-full sm:flex"}
                spaceBetween={spacing}
                slidesPerView={slidesPerView}
                modules={[Autoplay, Scrollbar]}
                autoplay={{
                    delay: AUTOPLAY_DELAY,
                    disableOnInteraction: true,
                }}
            >
                {React.Children.map(props.children, child => (
                    <SwiperSlide>{child}</SwiperSlide>
                ))}
            </Swiper>
            <MobileSliderWrapper>{props.children}</MobileSliderWrapper>
        </section>
    )
}

export default SliderGroup
