import style from "./ServiceCard.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import TextM from "@/components/atoms/text/text-m/TextM";
import {useState} from "react";
import {COLOR} from "@/components/colors";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";

const HeaderDescrCol = ({header, descr}: {
    header: string,
    descr: string,
}) => {
    return (
        <div className={style.headerDescrCol}>
            <TextLg text={header} weight={"semibold"}/>
            <TextBase text={descr}/>
        </div>
    )
}

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

const ExpandedInfoCol = ({serviceCard}: {
    serviceCard: ServiceCardDTO
}) => {
    return (
        <div className={style.expandedCol}>
            <ExpandedInfoCol.RentTimeBlock rentTime={serviceCard.rentTime}/>
            <ExpandedInfoCol.AdditionalBlock additional={serviceCard.additional}/>
        </div>
    )
}

const PriceCol = ({price}: {
    price: number
}) => {
    return (
        <div className={style.priceCol}>

            <div className={style.priceRow}>
                <Text2XL text={`от ${price} ₽`} color={COLOR["link-blue"]}/>
                <TextBase text={"в мес."} color={COLOR["text-gray"]}/>
            </div>

            <div className={style.buttonRow}>
                <Button
                    text={"К услуге"}
                    onClick={() => console.log("К услуге")}
                    color={COLOR["light-gray"]}
                />
                <LikeButton/>
            </div>

        </div>
    )
}

export type ServiceCardDTO = {
    header: string,
    descr: string,
    rentTime: { name: string, value: string }[],
    additional: string[],
    price: number
}

const ServiceCard = ({serviceCard}: {
    serviceCard: ServiceCardDTO
}) => {

    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className={style.wrapper}>

            <div className={style.contentRow}>
                <ServiceCard.HeaderDescrCol
                    header={serviceCard.header}
                    descr={serviceCard.descr}
                />
                {
                    isExpanded && <ServiceCard.ExpandedInfoCol
                        serviceCard={serviceCard}
                    />
                }
                <div className={"flex flex-row items-center gap-[10px] hover:cursor-pointer"}
                     onClick={() => setExpanded(!isExpanded)}
                >
                    <TextBase text={"Подробнее"} color={COLOR["link-blue"]}/>
                    <ChevronButton
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                    />
                </div>
            </div>

            <ServiceCard.PriceCol price={serviceCard.price}/>

        </div>
    )
}

ExpandedInfoCol.RentTimeBlock = RentTimeBlock
ExpandedInfoCol.AdditionalBlock = AdditionalBlock

ServiceCard.ExpandedInfoCol = ExpandedInfoCol
ServiceCard.HeaderDescrCol = HeaderDescrCol
ServiceCard.PriceCol = PriceCol

export default ServiceCard
