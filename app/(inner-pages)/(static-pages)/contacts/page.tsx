"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {HeaderDesrcType, TextLink} from "@/types/dto/text";
import BreadCrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiMail, FiMapPin} from "react-icons/fi";

const PhoneColumn = () => {

    const phoneData: HeaderDesrcType[] = [
        {header: "Билайн", descr: "+7 (383) 255-99-00"},
        {header: "МегаФон", descr: "+7 (923) 775-99-00"},
        {header: "TELE2", descr: "+7 (383) 381-99-00"},
        {header: "МТС", descr: "+7 (913) 788-99-00"},
    ]

    const itemCV: ClassValue = "flex flex-row items-baseline justify-between"

    return (
        <div className={"col-span-6 flex flex-col gap-5"}>

            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <Text text={"Горячая линия"} className={"text-[18px] text-black font-medium"}/>
                <Text text={"Ежедневно с 07:00 до 22:00"} className={"text-[14px] text-link-blue"}/>
            </div>

            <div className={"w-full bg-bg-light-blue rounded-xl flex flex-col gap-5 p-[30px]"}>
                {
                    phoneData.map((item, index) => {
                        const borderCV: ClassValue = {
                            "pb-5 border-b-2 border-light-gray": index !== phoneData.length - 1
                        }
                        return (
                            <div className={cn(itemCV, borderCV)}>
                                <Text text={item.header} className={"text-text-gray"}/>
                                <Text text={item.descr} className={"text-black"}/>
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
            icon: <FiMail size={"24px"} className={"stroke-link-blue"}/>
        },
        {
            header: "Адрес",
            text: "г. Новосибирск, ул. Кутателадзе, дом 4А, офис 503, 630128",
            icon: <FiMapPin size={"24px"} className={"stroke-link-blue"}/>
        }
    ]

    return (
        <div className={"col-span-6 flex flex-col gap-6"}>
            {
                blockData.map((item) => (
                    <div className={"w-full flex flex-col gap-5"}>
                        <Text text={item.header} className={"text-[18px] text-black font-medium"}/>
                        <div className={"px-[30px] py-[35px] flex flex-row items-center gap-[15px] rounded-xl bg-bg-light-blue"}>
                            {item.icon}
                            <Text text={item.text} className={"text-[16px] text-black"}/>
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
        <InnerPageWrapper>

            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <BreadCrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Наши контакты"}
                    className={"text-[24px] text-black font-semibold"}
                />
            </div>

            <PhoneColumn/>
            <MailAddressColumn/>

        </InnerPageWrapper>
    );

};

export default ContactsPage;
