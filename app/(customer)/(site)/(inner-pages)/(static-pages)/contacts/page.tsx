"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {HeaderDescription, TextLink} from "@/types/dto/text";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiMail, FiMapPin} from "react-icons/fi";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import React from "react";

const PhoneColumn = () => {

    const phoneData: HeaderDescription[] = [
        {header: "Билайн", description: "+7 (383) 255-99-00"},
        {header: "МегаФон", description: "+7 (923) 775-99-00"},
        {header: "TELE2", description: "+7 (383) 381-99-00"},
        {header: "МТС", description: "+7 (913) 788-99-00"},
    ]

    const itemCV: ClassValue = "flex flex-row items-baseline justify-between"

    return (
        <div className={"sm:col-span-6 flex flex-col gap-5"}>

            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <Text text={"Горячая линия"} className={"text-base sm:text-[18px] font-medium"}/>
                <Text text={"Ежедневно с 07:00 до 22:00"} className={"text-sm text-link-blue"}/>
            </div>

            <div className={"w-full bg-bg-light-blue rounded-xl flex flex-col gap-5 p-5 sm:p-7"}>
                {
                    phoneData.map((item, index) => {
                        const borderCV: ClassValue = {
                            "pb-5 border-b-2 border-light-gray": index !== phoneData.length - 1
                        }
                        return (
                            <div className={cn(itemCV, borderCV)}>
                                <Text text={item.header} className={"text-text-gray"}/>
                                <Text text={item.description} className={"text-black"}/>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

const MailAddressColumn = () => {

    const blockData = [
        {
            header: "Электронная почта",
            text: "info@3339900.ru",
            icon: <FiMail className={"stroke-link-blue sm:w-6 sm:h-6 h-[18px] w-[18px]"}/>
        },
        {
            header: "Адрес",
            text: "г. Новосибирск, ул. Кутателадзе, дом 4А, офис 503, 630128",
            icon: <FiMapPin className={"stroke-link-blue sm:w-6 sm:h-6 h-7 w-7"}/>
        }
    ]

    return (
        <div className={"sm:col-span-6 flex flex-col gap-5 sm:gap-6"}>
            {
                blockData.map((item) => (
                    <div className={"w-full flex flex-col gap-3 sm:gap-5 pb-5 sm:border-0 border-b-2 border-light-gray"}>
                        <Text text={item.header} className={"text-base sm:text-[18px] text-black font-medium"}/>
                        <div className={"sm:px-[30px] sm:py-[35px] flex flex-row items-center gap-[15px] sm:rounded-xl sm:bg-bg-light-blue"}>
                            {item.icon}
                            <Text text={item.text} className={"text-base text-black"}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}

const ContactsPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Контакты", link: "/contacts"},
    ]

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>

            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Наши контакты"}
                    className={"text-xl sm:text-[24px] text-black font-semibold"}
                />
            </div>

            <PhoneColumn/>
            <MailAddressColumn/>

        </InnerPageWrapper>
    );

};

export default ContactsPage;
