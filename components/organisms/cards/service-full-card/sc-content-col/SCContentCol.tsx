import style from "./SCContentCol.module.css"
import Text from "@/components/atoms/text/text-base/Text";
import TextM from "@/components/atoms/text/text-m/TextM";
import {COLOR} from "@/components/colors";
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";

const RentTimeBlock = ({rentTime}: {
    rentTime: { name: string, value: string }[]
}) => {
    return (
        <ServiceBlockWrapper header={"Срок аренды"}>
            {
                rentTime.map((item, index) => {
                    return <div className={style.timeRow}>
                        <Text text={item.name} color={COLOR["text-gray"]}/>
                        <Text text={item.value + " ₽"} color={COLOR["text-gray"]}/>
                    </div>
                })
            }
        </ServiceBlockWrapper>
    )
}

const AdditionalBlock = ({additional}: {
    additional: string[]
}) => {
    return (
        <ServiceBlockWrapper header={"В стоимость включено"}>
            {
                additional.map((item, index) => {
                    return <div className={style.additionalRow}>
                        <Text text={`0${index + 1}`} weight={"semibold"}/>
                        <Text text={item}/>
                    </div>
                })
            }
        </ServiceBlockWrapper>
    )
}

const SCContentCol = ({rentTime, additional}: {
    rentTime: { name: string, value: string }[],
    additional: string[]
}) => {
    return (
        <div className={style.contentCol}>
            <SCContentCol.RentTimeBlock rentTime={rentTime}/>
            <SCContentCol.AdditionalBlock additional={additional}/>
        </div>
    )
}

SCContentCol.RentTimeBlock = RentTimeBlock
SCContentCol.AdditionalBlock = AdditionalBlock

export default SCContentCol
