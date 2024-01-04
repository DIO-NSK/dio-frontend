"use client"

import {mockCardArray} from "@/data/productCardData";
import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import SCHeaderDescrCol from "@/components/organisms/cards/service-full-card/sc-header-descr-col/SCHeaderDescrCol";
import SCPriceCard from "@/components/organisms/cards/service-full-card/sc-price-card/SCPriceCard";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";

const SalePage = () => {

    const descr = "Сделайте свой первый заказ на выгодных условиях:" +
        "получите 3 бутыли воды «DIO» 19 л по цене двух! Начните экономить прямо сейчас!"

    const mockAdditionals: string[] = [
        "Выберите удобные дату и время получения заказа",
        "Получите 3 бутыли воды «DIO» 19 л. по цене двух!",
        "Выберите 3 любых бутыли «DIO» 19 л. из ассортимента компании"
    ]

    return (
        <div className={"col-span-full flex flex-col gap-[40px]"}>

            <div
                style={{padding: "0 100px 0 100px"}}
                className={"col-span-full grid grid-cols-12 gap-x-[20px] gap-y-[30px]"}
            >

                <div className={"col-span-9 flex flex-col gap-[40px]"}>
                    <SCHeaderDescrCol header={"Описание"} descr={descr}/>
                    <CardBulletCol header={"Для участия в акции"} items={mockAdditionals}/>
                </div>

                <StickyCardWrapper startCol={"col-start-10"}>
                    <SCPriceCard
                        price={22_400} text={"В корзину"}
                        onClick={() => console.log("В корзине")}
                    />
                </StickyCardWrapper>

            </div>

            <HeaderSliderBlock
                header={"Выберите товары"}
                cards={mockCardArray}
            />

        </div>
    );
};

export default SalePage;
