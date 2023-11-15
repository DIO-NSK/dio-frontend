import style from "./SCContentCol.module.css"
import TextBase from "@/components/atoms/text/text-base/TextBase";
import TextM from "@/components/atoms/text/text-m/TextM";
import {COLOR} from "@/components/colors";

const RentTimeBlock = ({rentTime}: {
    rentTime: { name: string, value: string }[]
}) => {
    return (
        <div className={style.blockCol}>

            <div className={"col-span-full"}>
                <TextM text={"Срок аренды"} weight={"medium"}/>
            </div>

            {
                rentTime.map((item, index) => {
                    return <div className={style.timeRow}>
                        <TextBase text={item.name} color={COLOR["text-gray"]}/>
                        <TextBase text={item.value} color={COLOR["text-gray"]}/>
                    </div>
                })
            }
        </div>
    )
}

const AdditionalBlock = ({additional}: {
    additional: string[]
}) => {
    return (
        <div className={style.blockCol}>

            <div className={"col-span-full"}>
                <TextM text={"В стоимость включено"} weight={"medium"}/>
            </div>

            {
                additional.map((item, index) => {
                    return <div className={style.additionalRow}>
                        <TextBase text={`0${index + 1}`} weight={"semibold"}/>
                        <TextBase text={item}/>
                    </div>
                })
            }
        </div>
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
