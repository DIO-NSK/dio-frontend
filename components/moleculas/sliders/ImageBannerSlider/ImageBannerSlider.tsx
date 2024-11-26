"use client";

import { useRef } from "react";

import { type Swiper as SwiperRef } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { BannerCard } from "./BannerCard/BannerCard";
import { config } from "./ImageBannerSlider.config";
import { Container } from "./ImageBannerSlider.styles";
import { Switcher } from "./Switcher/Switcher";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export const ImageBannerSlider = ({ banners, width }: { banners: ResponseCustomerBanner[]; width: string }) => {
  const swiperRef = useRef<SwiperRef>();

  const handleInitSwiper = (swiper: any) => {
    swiperRef.current = swiper;
  };

  return (
    <Container className={width}>
      <Switcher onBack={() => swiperRef.current?.slidePrev()} onNext={() => swiperRef.current?.slideNext()} />
      <Swiper onSwiper={handleInitSwiper} {...config}>
        {banners.map((banner, key) => (
          <SwiperSlide key={key}>
            <BannerCard banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
