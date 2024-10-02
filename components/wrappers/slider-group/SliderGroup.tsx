"use client"

import React, {useEffect, useRef, useState} from "react";
import {HeaderWrapperType} from "@/types/wrappers";
import Text from "@/components/atoms/text/text-base/Text";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import {cn} from "@/utlis/cn";

import {Autoplay, Navigation, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {type Swiper as SwiperRef} from 'swiper'

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

import SlideButton from "@/components/atoms/buttons/slide-button/SlideButton";
import {Side} from "@/data/enums/side";
import {AUTOPLAY_DELAY, DESKTOP_SLIDES_PER_VIEW, MOBILE_SLIDES_PER_VIEW} from "@/constants/swiper";
import Link from "next/link";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";

type SliderGroupProps = {
    desktopSlidesPerView?: number,
    mobileSlidesPerView?: number
    href?: string,
    headerSize?: string
} & HeaderWrapperType

const SliderGroup = (
    {
        desktopSlidesPerView = DESKTOP_SLIDES_PER_VIEW,
        mobileSlidesPerView = MOBILE_SLIDES_PER_VIEW,
        headerSize = 'xl',
        ...props
    }: SliderGroupProps
) => {

    const swiperRef = useRef<SwiperRef>()
    const isInitEnd = React.Children.count(props.children) <= desktopSlidesPerView
    const [isBegin, setBegin] = useState<boolean>(true)
    const [isEnd, setEnd] = useState<boolean>(isInitEnd)

    const headerCV = headerSize === 'xl' ? 'lg:text-[28px] xl:text-[32px]' : 'text-lg md:text-2xl font-medium'

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on("slideChange", (swipe) => {
                setBegin(Boolean(swipe.isBeginning))
                setEnd(Boolean(swipe.isEnd))
            })
        }
    }, [swiperRef.current]);

    return (
        <section id={props.id} className={cn("sm:pl-0 w-full col-span-full flex flex-col gap-5 xl:gap-7", props.className)}>
            <span className={"px-5 xl:px-0 col-span-full flex flex-row justify-between items-center"}>
                <span className={"flex flex-row items-baseline gap-5"}>
                    {props.header &&
                        <h2 className={cn("text-[20px] font-bold leading-none", headerCV)}>
                            {props.header}
                        </h2>}
                    {props.href && <Link href={props.href}>
                        <Text
                            className={"hidden sm:flex md:text-base xl:text-[18px] text-link-blue"}
                            text={"Перейти"}
                        />
                    </Link>}
                </span>
                <span className={"hidden md:flex flex-row items-center md:gap-2 lg:gap-4 xl:gap-[20px]"}>
                    <SlideButton
                        disabled={isBegin}
                        onClick={() => swiperRef.current?.slidePrev()}
                        side={Side["LEFT"]}
                    />
                    <SlideButton
                        disabled={isEnd}
                        onClick={() => swiperRef.current?.slideNext()}
                        side={Side["RIGHT"]}
                    />
                </span>
            </span>
            <section className={"hidden md:flex md:w-full"}>
                <Swiper
                    grabCursor={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    className={"active:cursor-grab hidden md:w-full"}
                    breakpoints={{
                        768 : {
                            spaceBetween : 10,
                            slidesPerView : 3
                        },
                        1024 : {
                            spaceBetween : 20,
                            slidesPerView : desktopSlidesPerView
                        }
                    }}
                    modules={[Navigation, Autoplay, Scrollbar]}
                    autoplay={{
                        delay: AUTOPLAY_DELAY,
                        pauseOnMouseEnter: true,
                    }}
                >
                    {React.Children.map(props.children, (child, index) => (
                        <SwiperSlide className='w-full' key={index}>{child}</SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <section className={"md:hidden flex w-full ml-5"}>
                <MobileSliderWrapper slidesPerView={mobileSlidesPerView}>{props.children}</MobileSliderWrapper>
            </section>
        </section>
    )
}

export default SliderGroup
