"use client"

import React from 'react';
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import {installmentPlan} from "@/data/static/installmentPlan";

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Рассрочка", link: "/installment-plan"},
]

const InstallmentPlanPage = () => {
    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Рассрочка"}
                    className={"text-xl sm:text-[24px] text-black font-semibold"}
                />
            </div>
            <StaticInfoCol data={installmentPlan}/>
        </InnerPageWrapper>
    );
};

export default InstallmentPlanPage;