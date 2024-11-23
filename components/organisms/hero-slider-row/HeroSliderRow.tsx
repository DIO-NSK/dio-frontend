"use client";

import ImageBannerSlider from "@/components/moleculas/sliders/image-banner-slider/ImageBannerSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { swiperConfig } from "./HeroSliderRow.config";
import { productCardCV } from "./HeroSliderRow.styles";
import { HeroSliderRowProps } from "./HeroSliderRow.types";

const HeroSliderRow = (props: HeroSliderRowProps) => (
  <section
    className={"col-span-full hidden md:grid md:grid-cols-6 lg:grid-cols-12 md:items-start xl:items-center gap-5"}
  >
    <ImageBannerSlider width={"md:col-span-4 lg:col-span-8 xl:col-span-9"} banners={props.banners} />
    <Swiper className={"md:col-span-2 lg:col-span-4 xl:col-span-3 w-full"} {...swiperConfig}>
      {props.dayProducts.map((product, key) => (
        <SwiperSlide key={key}>
          <ProductCard classNames={productCardCV} productCard={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default HeroSliderRow;
