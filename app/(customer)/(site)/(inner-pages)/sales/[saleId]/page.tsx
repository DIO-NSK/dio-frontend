"use client"

import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";
import {useUnit} from "effector-react";
import {$saleDetails, getSaleDetailsEvent} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/model";
import {useEffect} from "react";

const SalePage = ({params}: {
    params: {
        saleId: number
    }
}) => {

    const [saleDetails, getSaleDetails] = useUnit([$saleDetails, getSaleDetailsEvent])

    useEffect(() => {
        getSaleDetails(params.saleId)
    }, []);

    if (saleDetails) return (
        <div className={"col-span-full flex flex-col gap-[40px]"}>
            <div
                style={{padding: "0 100px 0 100px"}}
                className={"col-span-full grid grid-cols-12 gap-x-[20px] gap-y-[30px]"}
            >
                <div className={"col-span-9 flex flex-col gap-[40px]"}>
                    <CardBulletCol header={"Для участия в акции"} items={saleDetails.ruleList}/>
                </div>
            </div>
            <HeaderSliderBlock header={"Выберите товары"}/>
        </div>
    );
};

export default SalePage;
