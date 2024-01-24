import React from 'react';
import {ShoppingCartServiceCardDTO} from "@/types/dto/cards/ServiceCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {FiInfo} from "react-icons/fi";
import {Tooltip} from "@mui/joy";

const HeaderRow = ({card}: { card: ShoppingCartServiceCardDTO }) => {

    const servicePrice = card.price == 0 ? "Бесплатно" : `${card.price} ₽`

    return (
        <div className={"w-full flex flex-row items-center justify-between"}>

            <div className={"flex flex-row items-baseline gap-4"}>
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

const ShoppingCartServiceCard = ({card}: { card: ShoppingCartServiceCardDTO }) => {

    const imageCV: ClassValue = "w-[150px] h-[90px] rounded-xl bg-bg-light-gray"

    return (
        <div className={"w-full flex flex-row gap-5"}>
            <img src={card.image} alt={"/"} className={cn(imageCV)}/>
            <div className={"w-full flex flex-col gap-3"}>
                <HeaderRow card={card}/>
                <Text text={card.description} className={"text-base text-text-gray"}/>
            </div>
        </div>
    );
};

export default ShoppingCartServiceCard;
