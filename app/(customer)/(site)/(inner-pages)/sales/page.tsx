"use client"

import React, {useEffect} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {useUnit} from "effector-react";
import {$sales, getSalesEvent} from "@/app/(customer)/(site)/(inner-pages)/sales/model";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";

const SalesContentBlock = dynamic(
    () => import("@/components/organisms/loading-blocks/sales/SalesContentBlock"),
    {loading: () => <Loading/>}
)

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "Акции", link: "/sales"},
]

const SaleCatalogScreen = () => {

    const [sales, getSales] = useUnit([$sales, getSalesEvent])

    useEffect(() => {
        if (!sales.length) {
            getSales()
        }
    }, []);

    return (
        <InnerPageWrapper>
            <section className={"w-full col-span-full flex flex-col gap-0 -mt-7 sm:mt-0"}>
                <Text text={"Акции"} className={"text-lg sm:text-2xl font-medium leading-none"}/>
                <div className={"w-full -mt-1 sm:pt-0"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <SalesContentBlock sales={sales}/>
        </InnerPageWrapper>
    )
}

export default SaleCatalogScreen
