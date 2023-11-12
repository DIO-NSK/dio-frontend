import style from "./WaveHeader.module.css"
import Image from "next/image";
import Text40 from "@/components/atoms/text/text-40/Text40";
import React from "react";

import WaveImage from "@/public/images/wave-image.png"

export const WaveHeader = ({header} : {header : string}) => {
    return (
        <div className={style.wrapper}>
            <Image src={WaveImage.src} alt={'/'}
                   className={style.image} width={160}
                   height={18} quality={100}
            />
            <Text40 text={header}/>
            <Image src={WaveImage.src} alt={'/'}
                   className={style.image} width={160}
                   height={18} quality={100}
            />
        </div>
    )
}
