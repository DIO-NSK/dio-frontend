import ImageBannerSlider from "@/components/moleculas/sliders/image-banner-slider/ImageBannerSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {useEffect, useState} from "react";
import {useUnit} from "effector-react";
import {$userBanners, $userDayProducts, getBannersEvent, getDayProductsFx} from "@/app/(customer)/(site)/model";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

import {AUTOPLAY_DELAY} from "@/constants/swiper";

const HeroSliderRow = () => {

    const [dayProducts, getDayProducts] = useUnit([$userDayProducts, getDayProductsFx])
    const [bannerWidth, updateBannerWidth] = useState<string>("")
    const [banners, getBanners] = useUnit([$userBanners, getBannersEvent])

    useEffect(() => {
        getDayProducts()
            .then(products => {
                if (!products.length) {
                    updateBannerWidth("col-span-full")
                } else updateBannerWidth("col-span-9")
            })
            .then(_ => getBanners())
    }, []);

    if (banners) return (
        <div className={"hidden col-span-full sm:grid grid-cols-12 gap-[20px]"}>
            <ImageBannerSlider width={bannerWidth} banners={banners}/>
            {dayProducts && <Swiper
                className={"col-span-3 w-full"}
                slidesPerView={1}
                modules={[Autoplay, Scrollbar]}
                loop={true}
                autoplay={{
                    delay: AUTOPLAY_DELAY,
                    disableOnInteraction: true,
                }}
            >
                {dayProducts.map((product, key) => (
                    <SwiperSlide key={key}>
                        <ProductCard productCard={product}/>
                    </SwiperSlide>
                ))}
            </Swiper>}
        </div>
    );

};

export default HeroSliderRow;
