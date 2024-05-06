import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import {Autoplay, Navigation, Scrollbar} from "swiper/modules";
import {AUTOPLAY_DELAY} from "@/constants/swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

type MobileSliderWrapperProps = {
    slidesPerView ?: number,
    cols ?: number
} & WrapperProps

const MobileSliderWrapper = ({slidesPerView = 1.5, ...props}: MobileSliderWrapperProps) => {
    return (
        <Swiper
            grabCursor={true}
            className={"w-full"}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            modules={[Navigation, Autoplay, Scrollbar]}
            autoplay={{delay: AUTOPLAY_DELAY}}
        >
            {React.Children.map(props.children, (child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MobileSliderWrapper;
