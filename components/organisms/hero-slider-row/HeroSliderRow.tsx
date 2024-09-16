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
        "xl:scale-[0.95]",
        "xl:hover:scale-[0.95] xl:hover:shadow-none",
        "lg:col-span-4 xl:col-span-3"
    ])
}

const HeroSliderRow = (props: HeroSliderRowProps) => (
    <section className={"col-span-full hidden md:grid md:grid-cols-6 lg:grid-cols-12 md:items-start xl:items-center gap-5"}>
        <ImageBannerSlider width={"md:col-span-4 lg:col-span-8 xl:col-span-9"} banners={props.banners}/>
        <Swiper
            className={"md:col-span-2 lg:col-span-4 xl:col-span-3 w-full"}
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
