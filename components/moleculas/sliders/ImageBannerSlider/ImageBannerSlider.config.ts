import { AUTOPLAY_DELAY } from "@/constants/swiper";
import { Autoplay, Scrollbar } from "swiper/modules";
import { SwiperProps } from "swiper/react";

export const config: SwiperProps = {
  className: "w-full h-full",
  slidesPerView: 1,
  modules: [Autoplay, Scrollbar],
  loop: true,
  autoplay: {
    delay: AUTOPLAY_DELAY,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
};
