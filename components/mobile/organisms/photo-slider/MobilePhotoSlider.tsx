import React, {useState} from 'react';

import Slider from "react-slick";
import {cn} from "@/utlis/cn";
import {useUnit} from "effector-react";
import Link from "next/link";
import {$userBanners} from "@/app/(customer)/(site)/model";
import {WrapperProps} from "@/types/props/Wrapper";

type MobilePhotoSliderProps = {
    onChange : (next : number) => void,
    activeIndex : number
} & WrapperProps

export const MobilePhotoSliderWrapper = (props: MobilePhotoSliderProps) => {

    const settings = {
        dots: true,
        infinite: React.Children.count(props.children) > 1,
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
            return <div className={cn("mt-3 w-10 h-[3px]", stepColor)}/>
        }
    };

    return (
        <div className={cn("sm:hidden w-full overflow-hidden -mt-7 mb-7", props.className)}>
            <Slider {...settings} className={"w-full"}>
                {props.children}
            </Slider>
        </div>
    );

}

const MobilePhotoSlider = () => {

    const banners = useUnit($userBanners)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    return (
        <MobilePhotoSliderWrapper activeIndex={activeSlide} onChange={setActiveSlide}>
            {banners.map((banner, key) =>
                <Link href={banner.link}>
                    <img
                        src={banner.image} alt={'/'}
                        className={"w-full h-[220px] object-cover"}
                        key={key}
                    />
                </Link>
            )}
        </MobilePhotoSliderWrapper>
    );

};

export default MobilePhotoSlider;
