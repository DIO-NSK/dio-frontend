"use client";

import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { ImageLinkContainer } from "./ImageLinkContainer/ImageLinkContainer";
import { DefaultPhoto, MobilePhotoSliderProps } from "./MobilePhotoSlider.types";
import { Wrapper } from "./Wrapper/Wrapper";

const MobilePhotoSlider = ({ photos, ...props }: MobilePhotoSliderProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <Wrapper activeIndex={activeSlide} onChange={setActiveSlide} {...props}>
      {photos.map((banner, key) => (
        <ImageLinkContainer link={banner.link}>
          <Image
            src={(banner as DefaultPhoto).image ?? (banner as any).imageUrlDto.mobileImageUrl}
            className="w-full h-[180px] object-scale-down"
            alt="Фотография продукта"
            key={key}
          />
        </ImageLinkContainer>
      ))}
    </Wrapper>
  );
};

export default MobilePhotoSlider;
