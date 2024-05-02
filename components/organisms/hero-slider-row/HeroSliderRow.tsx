import ImageBannerSlider from "@/components/moleculas/sliders/image-banner-slider/ImageBannerSlider";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {useEffect} from "react";
import {useUnit} from "effector-react";
import {$userBanners, $userDayProducts, getDayProductsEvent} from "@/app/(customer)/(site)/model";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

import {AUTOPLAY_DELAY} from "@/constants/swiper";
import {cn} from "@/utlis/cn";

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95] sm:hover:shadow-none"
    ])
}

const HeroSliderRow = () => {

    const [dayProducts, getDayProducts] = useUnit([$userDayProducts, getDayProductsEvent])
    const banners = useUnit($userBanners)

    useEffect(() => {
        getDayProducts()
    }, []);

    return (
        <div className={"hidden col-span-full sm:grid grid-cols-12 items-center gap-[20px]"}>
            <ImageBannerSlider width={"col-span-9"} banners={banners}/>
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
                        <ProductCard
                            classNames={productCardCV}
                            productCard={product}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>}
        </div>
    );

};

export default HeroSliderRow;
