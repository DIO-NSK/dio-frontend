"use client"

import React, {useEffect} from 'react';
import SaleFullCard from "@/components/organisms/cards/sale-full-card/SaleFullCard";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {useUnit} from "effector-react";
import {$sales, getSalesEvent} from "@/app/(customer)/(site)/(inner-pages)/sales/model";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";

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
            <section className={"col-span-full flex flex-col gap-0"}>
                <Text text={"Акции"} className={"text-2xl font-medium leading-none"}/>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
            </section>
            {sales.map((sale, key) => (
                <SaleFullCard card={sale} key={key}/>
            ))}
        </InnerPageWrapper>
    )
}

export default SaleCatalogScreen
