import SlideButton from "@/components/atoms/buttons/slide-button/SlideButton";
import {Side} from "@/data/enums/side";
import React from "react";
import {type Swiper} from "swiper";

const ButtonSlider = ({swiper}: { swiper ?: Swiper }) => {
    console.log("SWIPER", swiper)
    return (
        <div className={"hidden sm:flex flex-row items-center gap-[20px]"}>
            <SlideButton side={Side["LEFT"]} onClick={() => console.log(swiper)}/>
            <SlideButton side={Side["RIGHT"]} onClick={() => swiper?.slidePrev()}/>
        </div>
    )
}

export default ButtonSlider
