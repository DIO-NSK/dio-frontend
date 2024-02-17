import Text from "@/components/atoms/text/text-base/Text";
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";

const RentTimeBlock = ({rentTime}: {
    rentTime: { name: string, value: string }[]
}) => {
    return (
        <ServiceBlockWrapper header={"Срок аренды"}>
            {
                rentTime.map((item, index) => {
                    return <div className={"col-span-3 flex flex-row items-baseline justify-between"}>
                        <Text text={item.name} className={"text-text-gray"}/>
                        <Text text={item.value + " ₽"} className={"text-text-gray"}/>
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
                    return <div className={"w-full sm:col-span-full flex flex-row gap-[15px] items-start sm:items-center"}>
                        <Text text={`0${index + 1}`} className={"font-semibold"}/>
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
        <div className={"w-full flex flex-col gap-5"}>
            <SCContentCol.RentTimeBlock rentTime={rentTime}/>
            <SCContentCol.AdditionalBlock additional={additional}/>
        </div>
    )
}

SCContentCol.RentTimeBlock = RentTimeBlock
SCContentCol.AdditionalBlock = AdditionalBlock

export default SCContentCol
