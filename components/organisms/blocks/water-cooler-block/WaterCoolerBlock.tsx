import WaterCoolerImage from "@/public/images/water-cooler-image.png"

import WaterdropLineIcon from "@/public/icons/waterdrop-line-icon.png"
import LeafLineIcon from "@/public/icons/leaf-line-icon.png"
import VirusLineIcon from "@/public/icons/virus-line-icon.png"
import AtomLineIcon from "@/public/icons/atom-line-icon.png"

import Image from "next/image";
import {HeaderDescription} from "@/types/dto/text";
import {waterCoolerBlockData} from "@/data/waterCoolerBlockData";
import Text from "@/components/atoms/text/text-base/Text";

const DescrCol = (
    {header, description, top, left}:
        HeaderDescription & { top: number, left: number }
) => {
    return (
        <div
            style={{top: top, left: left}}
            className={"absolute w-[350px] flex flex-col gap-[15px]"}
        >
            <Text text={header} className={"text-[24px] font-semibold"}/>
            <Text text={description} className={"text-[20px]"}/>
        </div>
    )
}

const WaterCoolerBlock = () => {

    return (
        <div className={"hidden relative w-full sm:flex flex-col items-center"}>

            <Image src={WaterdropLineIcon.src} alt={'/'}
                   className={"absolute object-fill z-10 left-[355px] top-[130px]"}
                   width={240} height={100} quality={100}
            />

            <Image src={AtomLineIcon.src} alt={'/'}
                   className={"absolute object-fill z-10 right-[342px] top-[230px]"}
                   width={160} height={100} quality={100}
            />

            <Image src={LeafLineIcon.src} alt={'/'}
                   className={"absolute h-[110px] object-scale-down z-10 left-[310px] top-[375px]"}
                   width={200} height={80} quality={100}
            />

            <Image src={VirusLineIcon.src} alt={'/'}
                   className={"absolute object-fill z-10 right-[342px] bottom-[92px]"}
                   width={160} height={100} quality={100}
            />

            {
                waterCoolerBlockData.map((item, index) => {
                    return <WaterCoolerBlock.DescrCol
                        top={item.top}
                        left={item.left}
                        header={item.header}
                        descr={item.descr}
                        key={index}
                    />
                })
            }

            <Image src={WaterCoolerImage.src} alt={'/'}
                   className={"w-[545px] h-[700px] object-fill"} width={500}
                   height={160} quality={100}
            />

        </div>
    )
}

WaterCoolerBlock.DescrCol = DescrCol

export default WaterCoolerBlock
