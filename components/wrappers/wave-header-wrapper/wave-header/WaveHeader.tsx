import React from "react";

import WaveImage from "@/public/images/wave-image.png"
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

export const WaveHeader = ({header} : {header : string}) => {

    const textCV = [
        "text-[24px] leading-tight font-semibold text-center",
        "sm:text-start sm:text-[40px] sm:font-bold"
    ]

    const imageCN = "w-[70px] sm:w-[160px] h-[10px] sm:h-[18px] object-fill"

    return (
        <header className={"w-full flex flex-row justify-between sm:gap-[40px] sm:justify-center items-center"}>
            <img className={imageCN} src={WaveImage.src} alt={'Изображение волны'}/>
            <h1 className={cn(textCV)}>{header}</h1>
            <img className={imageCN} src={WaveImage.src} alt={'/'}/>
        </header>
    )
}
