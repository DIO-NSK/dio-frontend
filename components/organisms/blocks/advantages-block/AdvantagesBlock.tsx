import React from 'react';
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import {
    CalendarCheckIcon,
    DropletsIcon, HandshakeIcon,
    HeadsetIcon,
    SearchCheckIcon,
    TimerResetIcon,
    TruckIcon,
    UsersIcon
} from "lucide-react";

const ICON_SIZE = 28

const AdvantagesBlock = () => {

    const advantagesCardData: { icon: React.ReactNode, header: string }[] = [
        {
            icon: <TimerResetIcon size={ICON_SIZE}/>,
            header: "Многолетний опыт работы"
        }, {
            icon: <DropletsIcon size={ICON_SIZE}/>,
            header: "Улучшение технологий"
        }, {
            icon: <TruckIcon size={ICON_SIZE}/>,
            header: "Доставка без выходных дней"
        }, {
            icon: <CalendarCheckIcon size={ICON_SIZE}/>,
            header: "Возможность доставки в день заказа"
        }, {
            icon: <SearchCheckIcon size={ICON_SIZE}/>,
            header: "Широкий ассортимент товаров и оборудования"
        }, {
            icon: <HeadsetIcon size={ICON_SIZE}/>,
            header: "Собственный сервис центр"
        }, {
            icon: <UsersIcon size={ICON_SIZE}/>,
            header: "Ответственные сотрудники"
        }, {
            icon: <HandshakeIcon size={ICON_SIZE}/>,
            header: "Демократичные цены"
        },
    ]

    return (
        <React.Fragment>
            <section className={"w-full hidden sm:flex"}>
                <HeaderGroup header={"Наши преимущества"}>
                    {
                        advantagesCardData.map((card) => {
                            return <AdvantageCard card={card}/>
                        })
                    }
                </HeaderGroup>
            </section>

            <MobileHeaderWrapper
                header={"Наши преимущества"}
                classNames={{contentWrapper: "w-full pr-5 grid grid-cols-2 gap-3 mb-7"}}
            >
                {advantagesCardData.map((card) => {
                    return <AdvantageCard card={card}/>
                })}
            </MobileHeaderWrapper>
        </React.Fragment>
    );

};

export default AdvantagesBlock;