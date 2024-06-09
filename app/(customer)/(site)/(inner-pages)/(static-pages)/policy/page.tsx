import {TextLink} from "@/types/dto/text";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import {policyData} from "@/data/static/policy";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import {Metadata} from "next";
import {returningData} from "@/data/static/returning";

export const metadata: Metadata = {
    title: 'Политика конфиденциальности — доставка питьевой воды по Новосибирску и области DIO',
    keywords: policyData.map(serviceGroup => serviceGroup.blockContent.map(item => item.itemHeader ?? '')).flat(),
    openGraph: {
        title: 'Политика конфиденциальности — доставка питьевой воды по Новосибирску и области DIO'
    }
}

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Политика конфиденциальности", link: "/policy"},
]

const PolicyPage = () => (
    <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
        <div className={"col-span-full flex flex-col gap-[10px]"}>
            <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
            <Text
                className={"text-xl sm:text-[24px] text-black font-semibold"}
                text={"Политика конфиденциальности персональных данных"}
            />
        </div>
        <StaticInfoCol data={policyData}/>
    </InnerPageWrapper>
);

export default PolicyPage;
