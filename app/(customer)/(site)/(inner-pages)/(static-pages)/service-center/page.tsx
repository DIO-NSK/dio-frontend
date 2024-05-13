"use client"

import React from 'react';
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import {installmentPlan} from "@/data/static/installmentPlan";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import {serviceCenter} from "@/data/static/serviceCenter";

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Сервисный центр", link: "/service-center"},
]

const ServiceCenterPage = () => {
    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>
            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Сервисный центр"}
                    className={"text-xl sm:text-[24px] text-black font-semibold"}
                />
            </div>
            <StaticInfoCol data={serviceCenter}/>
        </InnerPageWrapper>
    );
};

export default ServiceCenterPage;