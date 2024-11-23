import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { SwiperProps } from "swiper/react";

export const createSwiperConfig = (slidesPerView: number): SwiperProps => ({
    grabCursor: true,
    className: "w-full",
    spaceBetween: 5,
    slidesPerView: slidesPerView,
    modules: [Navigation, Autoplay, Scrollbar],
    autoplay: { delay: AUTOPLAY_DELAY },
});