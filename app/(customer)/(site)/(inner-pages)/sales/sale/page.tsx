"use client"

import HeaderSliderBlock from "@/components/wrappers/header-slider-block/HeaderSliderBlock";
import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";

const SalePage = () => {

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
                    <CardBulletCol header={"Для участия в акции"} items={mockAdditionals}/>
                </div>

            </div>

            <HeaderSliderBlock header={"Выберите товары"}/>

        </div>
    );
};

export default SalePage;
