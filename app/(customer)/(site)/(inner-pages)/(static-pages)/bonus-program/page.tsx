import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import Text from "@/components/atoms/text/text-base/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { bonusProgram } from "@/data/static/bonusProgram";
import { HeaderDescription, TextLink } from "@/types/dto/text";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import { InfoIcon } from "lucide-react";
import { Metadata } from "next";
import { FiMail, FiMapPin } from "react-icons/fi";

const breadcrumbs: TextLink[] = [
    { text: "Главная", link: "/" },
    { text: "Бонусная программа", link: "/bonus-program" },
]

const phoneData: HeaderDescription[] = [
    { header: "Билайн", description: "+7 (383) 255-99-00" },
    { header: "МегаФон", description: "+7 (923) 775-99-00" },
    { header: "TELE2", description: "+7 (383) 381-99-00" },
    { header: "МТС", description: "+7 (913) 788-99-00" },
]

const itemCV: ClassValue = "flex flex-row items-baseline justify-between"

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

// export const metadata: Metadata = {
//     title: 'Бонусная программа — доставка питьевой воды по Новосибирску и области DIO',
//     keywords: bonusProgram.map(group => group.blockContent.map(item => item.itemHeader ?? '')).flat(),
//     openGraph: {
//         title: 'Бонусная программа — доставка питьевой воды по Новосибирску и области DIO'
//     }
// }

const PhoneColumn = () => {
    return (
        <div className={"sm:col-span-6 flex flex-col gap-5"}>
            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <Text text={"Горячая линия"} className={"text-base sm:text-[18px] font-medium"} />
                <Text text={"Ежедневно с 07:00 до 22:00"} className={"text-sm text-link-blue"} />
            </div>
            <div className={"w-full bg-bg-light-blue rounded-xl flex flex-col gap-5 p-5 sm:p-7"}>
                {phoneData.map((item, index) => {
                    const borderCV: ClassValue = {
                        "md:pb-5 border-b-2 border-light-gray": index !== phoneData.length - 1
                    }
                    return (
                        <div className={cn(itemCV, borderCV)}>
                            <Text text={item.header} className={"text-text-gray"} />
                            <Text text={item.description} className={"text-black"} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const MailAddressColumn = () => {

    const blockData = [
        {
            header: "Электронная почта",
            text: "info@3339900.ru",
            icon: <FiMail className={"stroke-link-blue sm:w-6 sm:h-6 h-[18px] w-[18px]"} />
        },
        {
            header: "Адрес",
            text: "г. Новосибирск, ул. Кутателадзе, дом 4А, офис 503, 630128",
            icon: <FiMapPin className={"stroke-link-blue sm:w-6 sm:h-6 h-7 w-7"} />
        }
    ]

    return (
        <div className={"sm:col-span-6 flex flex-col gap-5 sm:gap-6"}>
            {blockData.map((item) => (
                <div
                    className={"w-full flex flex-col gap-3 sm:gap-5 xl:pb-5 sm:border-0 border-b-2 border-light-gray"}>
                    <Text text={item.header} className={"text-base sm:text-[18px] text-black font-medium"} />
                    <div
                        className={"sm:px-[30px] sm:py-[35px] flex flex-row items-center gap-[15px] sm:rounded-xl sm:bg-bg-light-blue"}>
                        {item.icon}
                        <Text text={item.text} className={"text-base text-black"} />
                    </div>
                </div>
            ))}
        </div>
    )

}

const bonusInformationText =
    'Бонус – единица учета скидки на будущую покупку. Бонусами можно оплатить до 70% от будущей покупки из расчета 1 Бонус\n' +
    '= 1 рубль. Бонусы нельзя использовать, в качестве скидки, при текущей покупке по которой начисляются данные бонусы.'

const BonusInformationBlock = () => (
    <section className={"col-span-full w-full rounded-xl p-7 bg-bg-light-blue flex flex-row items-center gap-7"}>
        <InfoIcon className={"size-8 shrink-0 text-link-blue"} />
        <Text text={bonusInformationText} className={"md:text-base xl:text-lg font-medium"} />
    </section>
)

const bonusData = [
    { header: "в копилку 4% от суммы заказа", message: "При единоразовой покупке 2-х до 3-х бутылей 19л" },
    { header: "в копилку 6% от суммы заказа", message: "При единоразовой покупке 4-х до 5-ти бутылей 19л" },
    { header: "в копилку 8% от суммы заказа", message: "При единоразовой покупке 6-ти и более бутылей 19л" },
]

const BonusConditionBlock = () => (
    <section className={"col-span-full w-full flex flex-row md:gap-5 xl:gap-7"}>
        {bonusData.map((item, key) => (
            <div className={"rounded-xl p-5 bg-bg-light-blue flex flex-col gap-2"} key={key}>
                <Text text={item.header} className={"text-lg text-link-blue font-medium"} />
                <Text text={item.message} className={"text-balance"} />
            </div>
        ))}
    </section>
)

const BonusProgramPage = () => (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-0" }}>
        <div className={"col-span-full flex flex-col gap-[10px]"}>
            <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
            <Text
                text={"Бонусная программа"}
                className={"text-xl sm:text-[24px] text-black font-semibold"}
            />
        </div>
        <PhoneColumn />
        <MailAddressColumn />
        <BonusInformationBlock />
        <BonusConditionBlock />
        <StaticInfoCol data={bonusProgram} />
    </InnerPageWrapper>
);

export default BonusProgramPage;
