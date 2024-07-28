"use client"

import React, {useState} from 'react';
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {PopupProps} from "@/types/props/Popup";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

type MobilePhotoGalleryPopupProps = {
    photos: string[]
} & PopupProps

const imageStyles = (isActive: boolean): ClassValue[] => [
    "w-[90px] h-[90px] rounded-xl",
    {"border-2 border-light-gray": isActive}
]

const MobilePhotoGalleryPopup = (props: MobilePhotoGalleryPopupProps) => {

    const [activeImage, setActiveImage] = useState<string>(props.photos[0])

    return (
        <MobilePageWrapper className={"sm:hidden fixed h-full z-40 top-0"}>
            <HeaderRow
                rightContent={<FiX size={"18px"} onClick={props.onClose}/>}
                leftContent={"1 из 8"}
                header={"Фотографии"}
                theme={"bordered"}
            />
            <img
                className={"w-full h-[350px] object-scale-down"}
                src={activeImage} alt={'Текущая фотография'}
            />
            <Swiper
                className={'w-full flex flex-row'}
                spaceBetween={12}
                direction={'horizontal'}
                slidesPerView={4}
            >
                {props.photos.map((photo, key) => (
                    <SwiperSlide key={key}>
                        <section
                            className={cn(imageStyles(photo === activeImage))}
                            onClick={() => setActiveImage(photo)}
                        >
                            <img
                                className={'w-full h-full'}
                                src={photo} alt={'Фотография изображения'}
                            />
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MobilePageWrapper>
    );
};

export default MobilePhotoGalleryPopup;
