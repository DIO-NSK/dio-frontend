import React, {useState} from 'react';

import Slider from "react-slick";
import {cn} from "@/utlis/cn";
import {useUnit} from "effector-react";
import {$banners, getAllBannersEvent} from "@/app/admin/promo/model";
import Link from "next/link";

const MobilePhotoSlider = () => {

    const [banners, getBanners] = useUnit([$banners, getAllBannersEvent])
    const [activeSlide, setActiveSlide] = useState<number>(0)

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => setActiveSlide(next),
        appendDots: (dots: any) => (
            <div>
                <ul className={"w-full flex items-center gap-5 justify-center"}> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => {
            const stepColor = activeSlide === i ? "bg-link-blue" : "bg-border-gray"
            return <div className={cn("mt-3 w-10 h-[3px]", stepColor)}/>
        }
    };

    return (
        <div className={"sm:hidden w-full -mt-7 mb-7"}>
            <Slider {...settings} className={"w-full"}>
                {banners.map((banner, key) =>
                    <Link href={banner.link}>
                        <img src={banner.image} alt={'/'} className={"w-full h-[200px] object-fit"} key={key}/>
                    </Link>
                )}
            </Slider>
        </div>
    );
};

export default MobilePhotoSlider;
