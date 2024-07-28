import ServiceCardWrapper from "@/components/wrappers/service-card-wrapper/ServiceCardWrapper";
import React, {useState} from "react";
import MoreButton from "@/components/atoms/buttons/more-button/MoreButton";
import {ServiceCardDTO} from "@/types/cards";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";
import {useUnit} from "effector-react";
import {selectServiceNameEvent, toggleServicePopupEvent} from "@/app/(customer)/(site)/(inner-pages)/services/model";
import {useRouter} from "next/navigation";

const HeaderDescriptionColumn = ({header, descr}: {
    header: string,
    descr: string,
}) => {

    const wrapperCV = [
        "w-full flex flex-col gap-3 sm:gap-4 pb-5",
        "border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Text text={header} className={"text-[18px] sm:text-[20px] font-semibold"}/>
            <Text text={descr}/>
        </div>
    )

}

const PriceCard = ({price, text, onClick}: {
    price?: number,
    text: string,
    onClick: () => void
}) => {
    return (
        <div className={"sm:col-span-3 flex flex-row items-center justify-between sm:flex-col sm:gap-3 h-fit"}>
            {price !== undefined ? price !== 0 ? (
                        <div className={"w-full flex flex-col sm:flex-row sm:gap-[10px] sm:items-baseline"}>
                            <Text text={`от ${price} ₽`} className={"text-[20px] sm:text-[24px] font-semibold text-link-blue"}/>
                            <Text text={"в мес."} className={"text-text-gray"}/>
                        </div>) :
                    <Text text={"Бесплатно"} className={"w-full text-[20px] sm:text-[24px] font-semibold text-link-blue"}/>
                : null
            }
            <Button
                classNames={{button: "px-7 sm:px-[50px]"}}
                text={text} onClick={onClick}
                buttonType={"SECONDARY"}
            />
        </div>
    )
}

const RentTimeBlock = ({rentTime}: {
    rentTime: { name: string, value: string }[]
}) => {
    return (
        <ServiceBlockWrapper header={"Срок аренды"}>
            {
                rentTime.map((item, key) => {
                    return <section className={"col-span-3 flex flex-row items-baseline justify-between"} key={key}>
                        <Text text={item.name} className={"text-text-gray"}/>
                        <Text text={item.value} className={"text-text-gray"}/>
                    </section>
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
                    return <div
                        className={"w-full sm:col-span-full flex flex-row gap-[15px] items-start"}>
                        <Text text={`0${index + 1}`} className={"font-semibold"}/>
                        <Text text={item}/>
                    </div>
                })
            }
        </ServiceBlockWrapper>
    )
}

const ContentColumn = ({rentTime, additional}: {
    rentTime?: { name: string, value: string }[],
    additional?: string[]
}) => {
    return (
        <div className={"w-full flex flex-col gap-5"}>
            {rentTime && <RentTimeBlock rentTime={rentTime}/>}
            {additional && <AdditionalBlock additional={additional}/>}
        </div>
    )
}

const ServiceFullCard = ({card}: {
    card: ServiceCardDTO
}) => {

    const router = useRouter()
    const [togglePopupState, selectServiceName] = useUnit([toggleServicePopupEvent, selectServiceNameEvent])
    const [isExpanded, setExpanded] = useState<boolean>(false)

    const handleOrderService = () => {
        selectServiceName(card.header)
        if (window.screen.width < 640) router.push("/mobile/services/order")
        else togglePopupState()
    }

    return (
        <ServiceCardWrapper>
            <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <HeaderDescriptionColumn {...card} />
                {isExpanded && <ContentColumn
                    rentTime={card.rentTime}
                    additional={card.additional}
                />}
                <MoreButton
                    text={"Подробнее"}
                    isExpanded={isExpanded}
                    setExpanded={setExpanded}
                />
            </section>
            <PriceCard
                onClick={handleOrderService}
                text={"Заказать услугу"}
                price={card.price}
            />
        </ServiceCardWrapper>
    )
}

export default ServiceFullCard
