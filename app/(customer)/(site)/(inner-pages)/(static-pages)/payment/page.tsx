"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {HeaderDescription, TextLink} from "@/types/dto/text";
import BreadCrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {paymentData} from "@/data/static/payment";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";

const TimeColumn = () => {

    const timeData: HeaderDescription[] = [
        {header: "Раннее утро", description: "07:00 — 09:00"},
        {header: "Утро", description: "10:00 — 12:00"},
        {header: "До обеда", description: "12:00 — 14:00"},
        {header: "В обед", description: "14:00 — 16:00"},
        {header: "После обеда", description: "16:00 — 18:00"},
        {header: "Ранним вечером", description: "18:00 — 20:00"},
        {header: "Поздним вечером", description: "20:00 — 22:00"},
    ]

    return (
        <div className={"col-span-6 flex flex-col gap-[25px]"}>
            {
                timeData.map((item, index) => {

                    const itemCV: ClassValue = {
                        "pb-[25px] border-b-2 border-light-gray": index !== timeData.length - 1
                    }

                    return (
                        <div className={cn("w-full flex flex-row items-baseline justify-between", itemCV)}>
                            <Text text={item.header} className={"text-text-gray"}/>
                            <Text text={item.description} className={"text-black"}/>
                        </div>
                    )

                })
            }
        </div>
    )
}

const RightColumn = () => {

    const data = [
        {
            header: "Приём заказов",
            paragraphs: [
                "Прием заказов через контакт центр: с понедельника по пятницу с 07-00 до 22-00.\n" +
                "В выходные и праздничные дни заказы принимаются с 8-00 до 21-00.",
                "Оставить заказ через интернет-магазин вы можете круглосуточно. Если вы осуществили заказ" +
                "на сайте во вне рабочее время контакт-центра, то он будет обработан только на следующий день."
            ]
        },
        {
            header: "Вся доставка осуществяется бесплатно",
            paragraphs: [
                "Доставка осуществляется на следующий день после принятия заказа, либо в соответствии\n" +
                "с графиком, если доставка заказа будет осуществляться по Новосибирской области.\n" +
                "В некоторых случаях возможна доставка в день заказа."
            ]
        },
        {
            header: "Минимальная сумма заказа — 800 ₽",
            paragraphs: [
                "Минимальный заказ воды в 19-ти литровой таре 2 бутыли.\n" +
                "Минимальный заказ любых товаров без воды в 19-ти литровой таре от 800 ₽."
            ]
        }
    ]

    return (
        <div className={"col-span-6 flex flex-col gap-[30px]"}>
            {
                data.map((item) => (
                    <div className={"w-full flex flex-col gap-[15px]"}>
                        <Text text={item.header} className={"text-[18px] text-black font-medium"}/>
                        {
                            item.paragraphs.map((paragraph) => (
                                <Text text={paragraph} className={"text-black"}/>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )

}

const InfoCard = () => {

    const infoCardData = [
        "Общество с ограниченной ответственностью «Караван»",
        "Адрес: 630128, г. Новосибирск, ул. Кутателадзе, дом 4А, офис 503",
        "ОГРН 117576031631 ИНН 5406972863 info@3339900.ru",
        "Мы осуществляем доставку питьевой воды по г. Новосибирску и области.",
        "Более подробную информацию вы можете получить у менеджеров контакт-центра по телефону: +7(383) 333-99-00"
    ]

    return (
        <div className={"col-span-full rounded-xl p-10 flex flex-row gap-10 bg-bg-light-blue"}>
            {
                Array.from({length : 2}, (_, index) => index).map((colNum) => (
                    <div className={"w-full flex flex-col gap-5"}>
                        {
                            infoCardData.slice(colNum * 3, (colNum + 1) * 3).map((text) => (
                                <div className={"pb-5 border-b-2 border-light-gray"}>
                                    <Text text={text} className={"text-base text-black"}/>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )

}

const PaymentPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Оплата и возврат товара", link: "/payment"},
    ]

    return (
        <InnerPageWrapper>

            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <BreadCrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Оплата и возврат товара"}
                    className={"text-[24px] text-black font-semibold"}
                />
            </div>

            <TimeColumn/>
            <RightColumn/>
            <StaticInfoCol data={paymentData}/>
            <InfoCard/>

        </InnerPageWrapper>
    );
};

export default PaymentPage;
