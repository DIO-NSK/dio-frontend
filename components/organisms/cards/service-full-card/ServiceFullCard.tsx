import ServiceCardWrapper from "@/components/wrappers/service-card-wrapper/ServiceCardWrapper";
import SCContentCol from "@/components/organisms/cards/service-full-card/sc-content-col/SCContentCol";
import SCPriceCard from "@/components/organisms/cards/service-full-card/sc-price-card/SCPriceCard";
import {useState} from "react";
import MoreButton from "@/components/atoms/buttons/more-button/MoreButton";
import {ServiceCardDTO} from "@/types/cards";
import {useRouter} from "next/navigation";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

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

const ServiceFullCard = ({card} : {
    card : ServiceCardDTO
}) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)
    const router = useRouter()

    return (
        <ServiceCardWrapper>

            <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
                <HeaderDescriptionColumn {...card} />
                {
                    isExpanded && <SCContentCol
                        rentTime={card.rentTime}
                        additional={card.additional}
                    />
                }
                <MoreButton
                    text={"Подробнее"}
                    isExpanded={isExpanded}
                    setExpanded={(isExpanded : boolean) => setExpanded(isExpanded)}
                />
            </section>

            <SCPriceCard
                text={"К услуге"} price={card.price}
                onClick={() => router.push('/services/service?service_id=1')}
            />

        </ServiceCardWrapper>
    )
}

export default ServiceFullCard
