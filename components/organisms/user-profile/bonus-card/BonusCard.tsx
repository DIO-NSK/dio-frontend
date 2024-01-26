import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import DIOBonusIcon from "@/components/atoms/svg/dio-bonus-icon/DIOBonusIcon";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const BonusCard = () => {

    const rowCN = "flex flex-row items-center gap-3"
    const wrapperCV : ClassValue[] = [
        "col-span-full flex flex-row items-center",
        "justify-between border-b-2 border-light-gray pb-4"
    ]

    return (
        <BackgroundBlockWrapper theme={"outlined"}>
            <div className={cn(wrapperCV)}>
                <Text text={"Бонусы"} className={"text-text-gray"}/>
                <div className={rowCN}>
                    <Text text={"231"} className={"text-lg font-medium text-link-blue"}/>
                    <DIOBonusIcon />
                </div>
            </div>
            <Text
                text={"Бонусы начисляются первого числа каждого месяца"}
                className={"text-text-gray col-span-full"}
            />
        </BackgroundBlockWrapper>
    );

};

export default BonusCard;
