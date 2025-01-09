"use client";

import { ImageBannerSlider } from "@/components/moleculas/sliders/ImageBannerSlider/ImageBannerSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperConfig } from "./HeroSliderRow.config";
import { productCardCV } from "./HeroSliderRow.styles";
import { HeroSliderRowProps } from "./HeroSliderRow.types";
import { createColumns } from "./HeroSliderRow.utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const HeroSliderRow = ({ banners, dayProducts }: HeroSliderRowProps) => (
  <Box
    gridTemplateColumns={["none", "none", createColumns(6), createColumns(12)]}
    alignItems={{ xl: "center", "2xl": "start" }}
    display={["none", "none", "grid"]}
    gridColumn="1 / -1"
    gap="20px"
  >
    <ImageBannerSlider width={"md:col-span-4 lg:col-span-8 xl:col-span-9 2xl:h-[480px]"} banners={banners} />
    <Swiper className={"md:col-span-2 lg:col-span-4 xl:col-span-3 w-full h-full"} {...swiperConfig}>
      {dayProducts.map((product, key) => (
        <SwiperSlide key={key}>
          <ProductCard classNames={productCardCV} productCard={product} hasLargePhoto />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);
