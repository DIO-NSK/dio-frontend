'use client';

import ImageBannerSlider from "@/components/moleculas/sliders/image-banner-slider/ImageBannerSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

import {AUTOPLAY_DELAY} from "@/constants/swiper";
import {cn} from "@/utlis/cn";
import {ResponseBanner} from "@/app/admin/promo/models/banner.model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

type HeroSliderRowProps = {
    banners: ResponseBanner[],
    dayProducts: ResponseProductSearch[]
}

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95] sm:hover:shadow-none"
    ])
}

const HeroSliderRow = (props: HeroSliderRowProps) => (
    <section className={"hidden col-span-full sm:grid grid-cols-12 items-center gap-[20px]"}>
        <ImageBannerSlider width={"col-span-9"} banners={props.banners}/>
        <Swiper
            className={"col-span-3 w-full"}
            slidesPerView={1} loop={true}
            modules={[Autoplay, Scrollbar]}
            autoplay={{
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: true,
            }}
        >
            {props.dayProducts.map((product, key) => (
                <SwiperSlide key={key}>
                    <ProductCard
                        classNames={productCardCV}
                        productCard={product}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
);

export default HeroSliderRow;
