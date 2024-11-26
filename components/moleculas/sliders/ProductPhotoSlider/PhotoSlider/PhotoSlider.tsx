import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhotoCard } from "../PhotoCard/PhotoCard";
import { PhotoSliderProps } from "./PhotoSlider.types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export const PhotoSlider = ({ photos, activePhoto, setActive }: PhotoSliderProps) => {
  const orderArray: number[] = Array.from({ length: photos.length }, (_, i) => i);
  const [photosOrder, setPhotosOrder] = useState<number[]>(orderArray);

  const shiftLeft = () => {
    photosOrder.unshift(photosOrder.pop() as number);
    const newArray = photosOrder.map((item) => item);
    setPhotosOrder(newArray);
  };

  const shiftRight = () => {
    photosOrder.push(photosOrder.shift() as number);
    const newArray = photosOrder.map((item) => item);
    setPhotosOrder(newArray);
  };

  useEffect(() => {
    setActive(photos[photosOrder[0]]);
  }, [photosOrder]);

  return (
    <HStack w="full" gap="10px">
      <FiChevronLeft size={"20px"} className={"stroke-text-gray hover:cursor-pointer"} onClick={shiftLeft} />
      <Swiper className={"w-full flex flex-row"} direction={"horizontal"} spaceBetween={12} slidesPerView={4}>
        {photosOrder.map((photo, key) => (
          <SwiperSlide key={key}>
            <PhotoCard isActive={photos[photo] === activePhoto} photo={photos[photo]} setActive={setActive} />
          </SwiperSlide>
        ))}
      </Swiper>
      <FiChevronRight size={"20px"} className={"stroke-text-gray hover:cursor-pointer"} onClick={shiftRight} />
    </HStack>
  );
};
