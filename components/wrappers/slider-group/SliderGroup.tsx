"use client";

import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import { cn } from "@/utlis/cn";
import React, { ReactElement, ReactNode, useMemo, useRef } from "react";

import { type Swiper as SwiperRef } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { DESKTOP_SLIDES_PER_VIEW, MIN_SLIDES_PER_VIEW, MOBILE_SLIDES_PER_VIEW } from "@/constants/swiper";
import { SliderHeader } from "./slider-header/SliderHeader";
import { swiperConfig } from "./SliderGroup.config";
import { SliderGroupProps } from "./SliderGroup.types";
import { SwiperContainer } from "./swiper-container/SwiperContainer";

const SliderGroup = ({
  desktopSlidesPerView = DESKTOP_SLIDES_PER_VIEW,
  mobileSlidesPerView = MOBILE_SLIDES_PER_VIEW,
  outOfScreen = true,
  headerSize = "xl",
  containerHeight,
  children,
  ...props
}: SliderGroupProps) => {
  const swiperRef = useRef<SwiperRef>();

  // Если количество элементов равно desktopSlidesPerView, добавляем первый элемент списка в конец.
  const slides = useMemo<React.ReactNode>(() => {
    if (React.Children.count(children) === desktopSlidesPerView) {
      const childrenArray: ReactNode[] = React.Children.toArray(children);
      const middleIndex = Math.floor(childrenArray.length / 2);

      const [middleElement, nextToMiddleElement] = [
        React.cloneElement(childrenArray[middleIndex] as ReactElement),
        React.cloneElement(childrenArray[middleIndex + 1] as ReactElement),
      ];

      const clonedArray = [middleElement, ...childrenArray, nextToMiddleElement];

      return clonedArray;
    }

    return children;
  }, [children]);

  const hasLoop = React.Children.count(slides) >= desktopSlidesPerView;
  const actualSlidesPerView = hasLoop ? desktopSlidesPerView : MIN_SLIDES_PER_VIEW;

  const onSwiper = (swiper: SwiperRef) => (swiperRef.current = swiper);

  return (
    <section id={props.id} className={cn("sm:pl-0 w-full col-span-full flex flex-col gap-5 xl:gap-7", props.className)}>
      <SliderHeader
        desktopSlidesPerView={actualSlidesPerView}
        headerSize={headerSize}
        hasLoop={hasLoop}
        ref={swiperRef}
        {...props}
      >
        {slides}
      </SliderHeader>
      <SwiperContainer outOfScreen={outOfScreen} containerHeight={containerHeight} hasLoop={hasLoop}>
        <Swiper onSwiper={onSwiper} {...swiperConfig(actualSlidesPerView, hasLoop)}>
          {React.Children.map(slides, (child, index) => (
            <SwiperSlide className="w-full" key={index}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      <section className={"md:hidden flex w-full ml-5"}>
        <MobileSliderWrapper slidesPerView={mobileSlidesPerView}>{slides}</MobileSliderWrapper>
      </section>
    </section>
  );
};

export default SliderGroup;
