import React from 'react';
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import {installmentPlan} from "@/data/static/installmentPlan";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Рассрочка — доставка питьевой воды по Новосибирску и области DIO',
    keywords: installmentPlan.map(serviceGroup => serviceGroup.blockContent.map(item => item.itemHeader ?? '')).flat(),
    openGraph: {
        title: 'Рассрочка — доставка питьевой воды по Новосибирску и области DIO'
    }
}

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Рассрочка", link: "/installment-plan"},
]

const InstallmentPlanPage = () => (
    <InnerPageWrapper classNames={{mobileWrapper: "pt-0"}}>
        <div className={"col-span-full flex flex-col gap-[10px]"}>
            <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
            <Text
                className={"text-xl sm:text-[24px] text-black font-semibold"}
                text={"Рассрочка"}
            />
        </div>
        <StaticInfoCol data={installmentPlan}/>
    </InnerPageWrapper>
);

export default InstallmentPlanPage;