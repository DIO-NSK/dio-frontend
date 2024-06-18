'use client'

import {Children, useState} from 'react';

import Slider from "react-slick";
import {cn} from "@/utlis/cn";
import Link from "next/link";
import {WrapperProps} from "@/types/props/Wrapper";
import {PropsWithClassName} from "@/types/props/utils/PropsWithClassName";
import Chip from "@/components/atoms/chip/Chip";
import Text from "@/components/atoms/text/text-base/Text";

type MobilePhotoSliderWrapperProps = {
    onChange: (next: number) => void,
    activeIndex: number,
    showQuantity?: boolean
} & WrapperProps

type MobilePhotoSliderProps = PropsWithClassName<{
    photos: { image: string, link?: string }[],
    showQuantity?: boolean
}>

export const MobilePhotoSliderWrapper = (props: MobilePhotoSliderWrapperProps) => {

    const settings = {
        dots: true,
        infinite: Children.count(props.children) > 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => props.onChange(next),
        appendDots: (dots: any) => (
            <div>
                <ul className={"w-full flex items-center gap-5 justify-center"}> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => {
            const stepColor = props.activeIndex === i ? "bg-link-blue" : "bg-border-gray"
            return <span className={cn("mt-3 w-10 h-[3px]", stepColor)}/>
        }
    };

    return (
        <section className={cn("sm:hidden w-full overflow-hidden relative -mt-7 mb-7", props.className)}>
            {props.showQuantity ? (
                <Chip className={'absolute top-5 right-5 bg-link-blue z-30'}>
                    <Text
                        text={`${props.activeIndex + 1} / ${Children.count(props.children)}`}
                        className={'text-white text-xs font-normal'}
                    />
                </Chip>
            ) : null}
            <Slider {...settings} className={"w-full"}>
                {props.children}
            </Slider>
        </section>
    );

}

const MobilePhotoSlider = (props: MobilePhotoSliderProps) => {

    const [activeSlide, setActiveSlide] = useState<number>(0)

    return (
        <MobilePhotoSliderWrapper activeIndex={activeSlide} onChange={setActiveSlide} {...props}>
            {props.photos.map((banner, key) => (
                    banner.link ? <Link href={banner.link}>
                        <img
                            src={banner.image} alt={'Фотография продукта'}
                            className={"w-full h-[200px] object-cover"}
                            key={key}
                        />
                    </Link> : <img
                        src={banner.image} alt={'Фотография продукта'}
                        className={"w-full h-[200px] object-cover"}
                        key={key}
                    />
                )
            )}
        </MobilePhotoSliderWrapper>
    );
};

export default MobilePhotoSlider;
