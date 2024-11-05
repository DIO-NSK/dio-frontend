'use client';

import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { WrapperProps } from "@/types/props/Wrapper";
import React, { Children } from 'react';
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

type MobileSliderWrapperProps = {
    slidesPerView ?: number,
    cols ?: number
} & WrapperProps

const MobileSliderWrapper = ({slidesPerView = 2.2, children}: MobileSliderWrapperProps) => (
    <Swiper
    grabCursor={true}
    className={"w-full"}
    spaceBetween={5}
    slidesPerView={Children.count(children) === 1 ? 1 : slidesPerView}
    modules={[Navigation, Autoplay, Scrollbar]}
    autoplay={{delay: AUTOPLAY_DELAY}}
>
    {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
    ))}
</Swiper>
)

export default MobileSliderWrapper;
