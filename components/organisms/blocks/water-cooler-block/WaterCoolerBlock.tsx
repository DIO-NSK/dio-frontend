import {HeaderDescription} from "@/types/dto/text";
import {waterCoolerBlockData} from "@/data/waterCoolerBlockData";

type DescriptionColumnProps = {
    description: string,
    top: number,
    left?: number,
    right?: number
} & HeaderDescription

const DescriptionColumn = ({header, description, top, left, right}: DescriptionColumnProps) => (
    <div
        className={"absolute w-[350px] flex flex-col gap-[15px]"}
        style={{top: top, left: left, right: right}}
    >
        <h3 className={"text-[22px] font-semibold"}>{header}</h3>
        <p className={"text-[18px]"}>{description}</p>
    </div>
)

const WaterCoolerBlock = () => (
    <section className={"hidden relative w-full sm:flex flex-col items-center"}>
        {waterCoolerBlockData.map((item, index) => {
            return <DescriptionColumn {...item} description={item.descr} key={index}/>
        })}
        <img
            src={'https://storage.yandexcloud.net/dio-static-images/DIO_Water_Cooler.png'}
            className={"-ml-10 w-[600px] h-[700px] object-scale-down"}
            alt={'Изображение кулера'}
        />
    </section>
)

export default WaterCoolerBlock
