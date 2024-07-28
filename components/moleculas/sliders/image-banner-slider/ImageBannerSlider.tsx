import {useRef} from "react";
import {cn} from "@/utlis/cn";
import Link from "next/link";
import {ResponseBanner} from "@/app/admin/promo/models/banner.model";

import {type Swiper as SwiperRef} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import {AUTOPLAY_DELAY} from "@/constants/swiper";
import {ButtonProps} from "@/types/props/buttons/Button";
import {ClassValue} from "clsx";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

const ArrowButton = ({onClick, icon} : ButtonProps) => {

    const buttonCV : ClassValue[] = [
        "size-8 rounded-full bg-black hoverable pointer",
        "bg-opacity-20 hover:bg-opacity-50 text-white",
        "flex items-center justify-center"
    ]

    return (
        <button onClick={onClick} className={cn(buttonCV)}>
            {icon}
        </button>
    )
}

const ImageBannerSlider = ({banners, width}: { banners: ResponseBanner[], width: string }) => {

    const swiperRef = useRef<SwiperRef>()

    if (banners.length) return (
        <section className={cn("relative flex items-center cursor-pointer h-[390px] rounded-2xl overflow-clip", width)}>
            <section className={"w-full absolute top-[calc(50%-32px)] left-0 p-5 flex justify-between z-10"}>
                <ArrowButton icon={<FiChevronLeft size={"20px"}/>} onClick={() => swiperRef.current?.slidePrev()}/>
                <ArrowButton icon={<FiChevronRight size={"20px"}/>} onClick={() => swiperRef.current?.slideNext()}/>
            </section>
            <Swiper
                className={"w-full h-full"}
                onSwiper={swiper => {swiperRef.current = swiper}}
                slidesPerView={1}
                modules={[Autoplay, Scrollbar]}
                loop={true}
                autoplay={{
                    delay: AUTOPLAY_DELAY,
                    disableOnInteraction: true,
                    pauseOnMouseEnter : true
                }}
            >
                {banners.map((banner, key) => (
                    <SwiperSlide key={key}>
                        <Link href={banner.link}>
                            <img
                                className={"w-full h-full object-cover"}
                                src={banner.image} alt={'/'}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default ImageBannerSlider
