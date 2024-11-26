"use client";

import Text from "@/components/atoms/Text/Text";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import ButtonSlider from "@/components/moleculas/sliders/ButtonSlider/ButtonSlider";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { BREAKPOINT_MOBILE } from "@/constants";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import React from "react";

const HeaderSliderBlock = ({ header, children }: { header: string; children: React.ReactNode }) => {
  const wrapperCV: ClassValue[] = [
    "sm:px-[100px] w-full flex flex-col gap-7 sm:gap-10 px-5",
    "py-7 bg-bg-light-blue border-b-2 border-light-gray",
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < BREAKPOINT_MOBILE;

  return (
    <div className={cn(wrapperCV)}>
      <div className={"w-full sm:col-span-full flex flex-row items-center justify-between"}>
        <Text className={"text-[20px] sm:text-[24px] font-semibold leading-none"} text={header} />
        <ButtonSlider />
      </div>
      <div className={"hidden w-full grid-cols-12 gap-x-[20px] gap-y-[30px] sm:grid"}>
        <SliderGroup>{!isMobile ? children : null}</SliderGroup>
      </div>
      <MobileSliderWrapper>{isMobile ? children : null}</MobileSliderWrapper>
    </div>
  );
};

export default HeaderSliderBlock;
