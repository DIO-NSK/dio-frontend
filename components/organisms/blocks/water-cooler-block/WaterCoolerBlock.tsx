import WaterCoolerImage from "@/public/images/DIO_Water_Cooler.png"

import Image from "next/image";
import {HeaderDescription} from "@/types/dto/text";
import {waterCoolerBlockData} from "@/data/waterCoolerBlockData";
import Text from "@/components/atoms/text/text-base/Text";

const DescriptionColumn = ({header, description, top, left, right}: {
    description: string,
    top: number,
    left ?: number,
    right ?: number
} & HeaderDescription) => {
    return (
        <div
            style={{top: top, left: left, right : right}}
            className={"absolute w-[350px] flex flex-col gap-[15px]"}
        >
            <Text text={header} className={"text-[22px] font-semibold"}/>
            <Text text={description} className={"text-[18px]"}/>
        </div>
    )
}

const WaterCoolerBlock = () => {

    return (
        <div className={"hidden relative w-full sm:flex flex-col items-center"}>

            {waterCoolerBlockData.map((item, index) => {
                return <WaterCoolerBlock.DescrCol {...item} description={item.descr} key={index}/>
            })}

            <Image
                src={WaterCoolerImage.src} alt={'Изображение кулера'}
                className={"-ml-10 w-[600px] h-[700px] object-scale-down"}
                width={600} height={700} quality={100}
            />

        </div>
    )
}

WaterCoolerBlock.DescrCol = DescriptionColumn

export default WaterCoolerBlock
