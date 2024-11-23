import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { SwiperProps } from "swiper/react";

export const swiperConfig = (desktopSlidesPerView: number, hasLoop: boolean): SwiperProps => ({
    grabCursor: true,
    loop: hasLoop,
    className: "active:cursor-grab hidden md:w-full",
    modules: [Navigation, Autoplay, Scrollbar],
    breakpoints: {
        768: {
            spaceBetween: 10,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 20,
            slidesPerView: 4,
        },
        1400: {
            spaceBetween: 20,
            slidesPerView: desktopSlidesPerView,
        },
    },
    autoplay: {
        delay: AUTOPLAY_DELAY,
        pauseOnMouseEnter: true,
    },
})