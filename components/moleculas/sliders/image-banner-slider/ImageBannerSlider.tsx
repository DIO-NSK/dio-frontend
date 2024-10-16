import { cn } from "@/utlis/cn";
import Link from "next/link";
import { useRef } from "react";

import { type Swiper as SwiperRef } from 'swiper';
import { Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { ButtonProps } from "@/types/props/buttons/Button";
import { useResponsiveImage } from "@/utlis/hooks/useResponsiveImage";
import { ClassValue } from "clsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const ArrowButton = ({ onClick, icon }: ButtonProps) => {

    const buttonCV: ClassValue[] = [
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

const BannerCard = ({ banner }: { banner: ResponseCustomerBanner }) => {
    const image = useResponsiveImage(banner);

    console.log('banner', banner);

    return (
        <Link href={banner.link}>
            <img
                className={"w-full h-full object-cover"}
                src={image} alt={'/'}
            />
        </Link>
    )
}

const ImageBannerSlider = ({ banners, width }: { banners: ResponseCustomerBanner[], width: string }) => {
    const swiperRef = useRef<SwiperRef>()

    if (banners.length) return (
        <section className={cn("relative flex items-center cursor-pointer md:h-[310px] lg:h-[330px] xl:h-[390px] rounded-2xl overflow-clip", width)}>
            <section className={"w-full absolute top-[calc(50%-32px)] left-0 p-5 flex justify-between z-10"}>
                <ArrowButton icon={<FiChevronLeft size={"20px"} />} onClick={() => swiperRef.current?.slidePrev()} />
                <ArrowButton icon={<FiChevronRight size={"20px"} />} onClick={() => swiperRef.current?.slideNext()} />
            </section>
            <Swiper
                className={"w-full h-full"}
                onSwiper={swiper => { swiperRef.current = swiper }}
                slidesPerView={1}
                modules={[Autoplay, Scrollbar]}
                loop={true}
                autoplay={{
                    delay: AUTOPLAY_DELAY,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
            >
                {banners.map((banner, key) => (
                    <SwiperSlide key={key}>
                        <BannerCard banner={banner} key={key} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default ImageBannerSlider
