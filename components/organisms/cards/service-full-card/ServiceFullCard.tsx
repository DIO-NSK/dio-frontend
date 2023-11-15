import style from "./ServiceFullCard.module.css"

import ServiceCardWrapper from "@/components/wrappers/service-card-wrapper/ServiceCardWrapper";
import SCContentCol from "@/components/organisms/cards/service-full-card/sc-content-col/SCContentCol";
import SCHeaderDescrCol from "@/components/organisms/cards/service-full-card/sc-header-descr-col/SCHeaderDescrCol";
import SCPriceCard from "@/components/organisms/cards/service-full-card/sc-price-card/SCPriceCard";
import {ServiceCardDTO} from "@/components/wrappers/service-card/ServiceCard";
import {useState} from "react";
import MoreButton from "@/components/atoms/buttons/more-button/MoreButton";

const ServiceFullCard = ({card} : {
    card : ServiceCardDTO
}) => {

    const [isExpanded, setExpanded] = useState<boolean>(false)

    return (
        <ServiceCardWrapper>

            <div className={style.content}>
                <SCHeaderDescrCol header={card.header} descr={card.descr} />

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

            </div>

            <SCPriceCard price={card.price} />

        </ServiceCardWrapper>
    )
}

export default ServiceFullCard
