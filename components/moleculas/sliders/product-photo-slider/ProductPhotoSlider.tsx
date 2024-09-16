'use client'

import React, {useEffect, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {COLOR} from "@/components/colors";
import {cn} from "@/utlis/cn";
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';

const MainPhotoCard = ({photo}: { photo?: string }) => {

    const imageCV = [
        "w-full md:h-[200px] lg:h-[250px] xl:h-[300px] object-scale-down rounded-xl",
        "border-2 border-light-gray"
    ]

    return (
        <img className={cn(imageCV)} src={photo} alt={'Изображение продукта'}/>
    )
}

const PhotoCard = ({photo, isActive, setActive}: {
    photo?: string,
    isActive: boolean,
    setActive: (photo ?: string) => void
}) => {
    return (
        <img
            className={"h-[100px] w-full rounded-xl border-light-gray object-scale-down border-[2px] hover:pointer"}
            style={{borderColor: isActive ? COLOR["light-gray"] : COLOR["white"]}}
            onClick={() => setActive(photo)}
            src={photo} alt={'/'}
        />
    )
}

const PhotoSlider = ({photos, activePhoto, setActive}: {
    photos: string[],
    activePhoto?: string,
    setActive: (photo ?: string) => void
}) => {

    const orderArray: number[] = Array.from({length: photos.length}, (_, i) => i)
    const [photosOrder, setPhotosOrder] = useState<number[]>(orderArray)

    const shiftLeft = () => {
        photosOrder.unshift(photosOrder.pop() as number)
        const newArray = photosOrder.map((item) => item)
        setPhotosOrder(newArray)
    }

    const shiftRight = () => {
        photosOrder.push(photosOrder.shift() as number)
        const newArray = photosOrder.map((item) => item)
        setPhotosOrder(newArray)
    }

    useEffect(() => {
        setActive(photos[photosOrder[0]])
    }, [photosOrder])

    return (
        <div className={"w-full flex flex-row items-center gap-[10px]"}>

            <FiChevronLeft
                size={"20px"}
                className={"stroke-text-gray hover:cursor-pointer"}
                onClick={() => shiftLeft()}
            />

            <Swiper
                className={'w-full flex flex-row'}
                direction={'horizontal'}
                spaceBetween={12}
                slidesPerView={4}
            >
                {photosOrder.map((photo, key) => (
                    <SwiperSlide key={key}>
                        <ProductPhotoSlider.PhotoCard
                            photo={photos[photo]}
                            isActive={photos[photo] === activePhoto}
                            setActive={setActive}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <FiChevronRight
                size={"20px"}
                className={"stroke-text-gray hover:cursor-pointer"}
                onClick={() => shiftRight()}
            />

        </div>
    )
}

const ProductPhotoSlider = ({photos}: { photos: string[] }) => {

    const [activePhoto, setActivePhoto] = useState<string>()

    return (
        <div className={"hidden md:col-start-1 md:col-span-full xl:col-span-5 md:flex flex-col gap-5"}>
            <ProductPhotoSlider.MainPhotoCard photo={activePhoto}/>
            <ProductPhotoSlider.PhotoSlider
                photos={photos}
                activePhoto={activePhoto}
                setActive={setActivePhoto}
            />
        </div>
    )
}

ProductPhotoSlider.PhotoCard = PhotoCard
ProductPhotoSlider.MainPhotoCard = MainPhotoCard
ProductPhotoSlider.PhotoSlider = PhotoSlider

export default ProductPhotoSlider
