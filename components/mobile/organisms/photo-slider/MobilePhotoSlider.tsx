import React, {useState} from 'react';

import MockBannerImage1 from "@/public/images/MobilePromoImage.png";
import MockBannerImage2 from "@/public/images/banner-image-2.jpg";

import Slider from "react-slick";
import {cn} from "@/utlis/cn";

const photoSliderData: string[] = [
    MockBannerImage1.src, MockBannerImage2.src,
    MockBannerImage1.src, MockBannerImage2.src,
]

const MobilePhotoSlider = () => {

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
        beforeChange: (_ : number, next : number) => setActiveSlide(next),
        appendDots: (dots : any) => (
            <div>
                <ul className={"w-full flex items-center gap-5 justify-center"}> {dots} </ul>
            </div>
        ),
        customPaging: (i : number) => {
            const stepColor = activeSlide === i ? "bg-link-blue" : "bg-border-gray"
            return <div className={cn("mt-3 w-10 h-[3px]", stepColor)}/>
        }
    };

    return (
        <div className={"sm:hidden w-full -mt-7 mb-7"}>
            <Slider {...settings} className={"w-full"}>
                {
                    photoSliderData.map((image, key) =>
                        <img src={image} alt={'/'} className={"w-full h-[200px] object-fit"} key={key}/>
                    )
                }
            </Slider>
        </div>
    );
};

export default MobilePhotoSlider;
