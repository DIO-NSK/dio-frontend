import React from 'react';
import {ShoppingCartServiceCardDTO} from "@/types/dto/admin/cards/ServiceCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {FiInfo} from "react-icons/fi";
import {Tooltip} from "@mui/joy";

const HeaderRow = ({card}: { card: ShoppingCartServiceCardDTO }) => {

    const servicePrice = card.price == 0 ? "Бесплатно" : `${card.price} ₽`

    return (
        <div className={"hidden w-full sm:flex flex-row items-center justify-between"}>

            <div className={"flex flex-row items-baseline gap-2 sm:gap-4"}>
                <Text text={card.header} className={"text-lg font-medium"}/>
                {
                    card.deadline && <Text
                        text={`Акция до ${card.deadline}`}
                        className={"text-base text-text-gray"}
                    />
                }
            </div>

            <div className={"flex flex-row items-center gap-5"}>
                <Text text={`${card.amount} шт.`} className={"text-text-gray text-lg"}/>
                <div className={"flex flex-row items-center gap-[15px]"}>
                    <Tooltip
                        title={"Данная услуга идёт в подарок в рамках акции"}
                        variant={"outlined"}
                        color={"primary"}
                        arrow
                    >
                        <button>
                            <FiInfo
                                size={"20px"}
                                className={"text-text-gray hoverable pointer hover:text-link-blue"}
                            />
                        </button>
                    </Tooltip>
                    <Text text={servicePrice} className={"text-[24px] font-medium"}/>
                </div>
            </div>

        </div>
    )
}

const MobileHeaderRow = ({card} : {card : ShoppingCartServiceCardDTO}) => {

    const servicePrice = card.price == 0 ? "Бесплатно" : `${card.price} ₽`

    return (
        <section className={"sm:hidden w-full flex flex-col gap-1"}>
            <div className={"flex flex-row items-center gap-2"}>
                <Text text={servicePrice} className={"text-link-blue font-semibold uppercase"}/>
                <Tooltip
                    title={"Данная услуга идёт в подарок в рамках акции"}
                    variant={"outlined"}
                    color={"primary"}
                    arrow
                >
                    <button>
                        <FiInfo
                            size={"18px"}
                            className={"text-text-gray hoverable pointer hover:text-link-blue"}
                        />
                    </button>
                </Tooltip>
            </div>
            <Text text={card.header} />
            {
                card.deadline && <Text
                    text={`Акция до ${card.deadline}`}
                    className={"text-[14px] text-text-gray"}
                />
            }
        </section>
    )
}

const ShoppingCartServiceCard = ({card}: { card: ShoppingCartServiceCardDTO }) => {

    const imageCV: ClassValue[] = [
        "w-[76px] h-[60px] rounded-lg object-cover sm:w-[150px]",
        "sm:h-[90px] sm:rounded-xl bg-bg-light-gray"
    ]

    return (
        <section className={"w-full flex flex-row gap-3 sm:gap-5"}>
            <img src={card.image} alt={"/"} className={cn(imageCV)}/>
            <div className={"w-full flex flex-col gap-2 sm:gap-3"}>
                <HeaderRow card={card}/>
                <MobileHeaderRow card={card}/>
                <Text text={card.description} className={"hidden sm:flex text-base text-text-gray"}/>
            </div>
        </section>
    );
};

export default ShoppingCartServiceCard;
