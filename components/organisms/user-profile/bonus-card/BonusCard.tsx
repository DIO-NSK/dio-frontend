import React, {useEffect} from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import DIOBonusIcon from "@/components/atoms/svg/dio-bonus-icon/DIOBonusIcon";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {getBonuses} from "@/app/(customer)/profile/page.api";

const rowCN = "flex flex-row items-center gap-3"
const wrapperCV: ClassValue[] = [
    "col-span-full flex flex-row items-center",
    "justify-between border-b-2 border-light-gray pb-4"
]

const BonusCard = () => {

    const [bonuses, setBonuses] = React.useState<number>(0);

    useEffect(() => {
        getBonuses().then(setBonuses)
    }, []);

    return (
        <div className={"w-full flex flex-col"}>
            <Text text={"Бонусы"} className={"sm:hidden text-lg font-medium"}/>
            <BackgroundBlockWrapper theme={"outlined"}>
                <div className={cn(wrapperCV)}>
                    <Text text={"Бонусы"} className={"text-text-gray"}/>
                    <div className={rowCN}>
                        {bonuses ? <Text text={String(bonuses)} className={"text-lg font-medium text-link-blue"}/> : null}
                        <DIOBonusIcon/>
                    </div>
                </div>
                <Text
                    text={"Бонусы начисляются первого числа каждого месяца"}
                    className={"text-text-gray col-span-full"}
                />
            </BackgroundBlockWrapper>
        </div>
    );

};

export default BonusCard;
