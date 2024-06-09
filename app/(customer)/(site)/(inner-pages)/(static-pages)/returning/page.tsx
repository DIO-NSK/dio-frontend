import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import {returningData} from "@/data/static/returning";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import React from "react";
import {Metadata} from "next";
import {services} from "@/data/static/services";

export const metadata: Metadata = {
    title: 'Возврат и обмен товара — доставка питьевой воды по Новосибирску и области DIO',
    keywords: returningData.map(serviceGroup => serviceGroup.blockContent.map(item => item.itemHeader ?? '')).flat(),
    openGraph: {
        title: 'Возврат и обмен товара — доставка питьевой воды по Новосибирску и области DIO'
    }
}

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Возврат и обмен товара", link: "/returning"},
]

const ReturningPage = () => (
    <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
        <div className={"col-span-full flex flex-col gap-[10px]"}>
            <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
            <Text
                className={"text-[24px] text-black font-semibold"}
                text={"Возврат и обмен товара"}
            />
        </div>
        <StaticInfoCol data={returningData}/>
    </InnerPageWrapper>
);

export default ReturningPage;
