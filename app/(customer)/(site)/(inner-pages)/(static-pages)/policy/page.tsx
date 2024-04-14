"use client"

import {TextLink} from "@/types/dto/text";
import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import {policyData} from "@/data/static/policy";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";

const PolicyPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Политика конфиденциальности", link: "/policy"},
    ]

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>

            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Политика конфиденциальности персональных данных"}
                    className={"text-xl sm:text-[24px] text-black font-semibold"}
                />
            </div>

            <StaticInfoCol data={policyData}/>

        </InnerPageWrapper>
    );
};

export default PolicyPage;
