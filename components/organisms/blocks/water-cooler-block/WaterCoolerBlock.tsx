import style from "./WaterCoolerBlock.module.css"

import WaterCoolerImage from "@/public/images/water-cooler-image.png"

import WaterdropLineIcon from "@/public/icons/waterdrop-line-icon.png"
import LeafLineIcon from "@/public/icons/leaf-line-icon.png"
import VirusLineIcon from "@/public/icons/virus-line-icon.png"
import AtomLineIcon from "@/public/icons/atom-line-icon.png"

import Image from "next/image";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import {HeaderDesrcType} from "@/types/text";
import {waterCoolerBlockData} from "@/data/waterCoolerBlockData";

const DescrCol = (
    {header, descr, top, left}:
        HeaderDesrcType & { top: number, left: number }
) => {
    return (
        <div
            style={{top: top, left: left}}
            className={style.headerDescrCol}
        >
            <Text2XL text={header}/>
            <TextLg text={descr}/>
        </div>
    )
}

const WaterCoolerBlock = () => {

    return (
        <div className={style.wrapper}>

            <Image src={WaterdropLineIcon.src} alt={'/'}
                   className={style.waterdrop}
                   width={240} height={100} quality={100}
            />

            <Image src={AtomLineIcon.src} alt={'/'}
                   className={style.atom}
                   width={160} height={100} quality={100}
            />

            <Image src={LeafLineIcon.src} alt={'/'}
                   className={style.leaf}
                   width={200} height={80} quality={100}
            />

            <Image src={VirusLineIcon.src} alt={'/'}
                   className={style.virus}
                   width={160} height={100} quality={100}
            />

            {
                waterCoolerBlockData.map((item) => {
                    return <WaterCoolerBlock.DescrCol
                        top={item.top}
                        left={item.left}
                        header={item.header}
                        descr={item.descr}
                    />
                })
            }

            <Image src={WaterCoolerImage.src} alt={'/'}
                   className={style.coolerImage} width={500}
                   height={160} quality={100}
            />

        </div>
    )
}

WaterCoolerBlock.DescrCol = DescrCol

export default WaterCoolerBlock
