"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { createSwiperConfig } from "./MobileSliderWrapper.config";
import { MobileSliderWrapperProps } from "./MobileSliderWrapper.types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const SLIDES_PER_VIEW = 2.2;

const MobileSliderWrapper = ({ children }: MobileSliderWrapperProps) => (
  <Swiper {...createSwiperConfig(SLIDES_PER_VIEW)}>
    {React.Children.map(children, (child, index) => (
      <SwiperSlide className="col-span-1" key={index}>
        {child}
      </SwiperSlide>
    ))}
  </Swiper>
);

export default MobileSliderWrapper;
