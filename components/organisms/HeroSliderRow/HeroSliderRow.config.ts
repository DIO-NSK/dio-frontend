import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { Autoplay, Scrollbar } from "swiper/modules";

export const swiperConfig = {
    slidesPerView: 1,
    modules: [Autoplay, Scrollbar],
    autoplay: {
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: true
    }
}