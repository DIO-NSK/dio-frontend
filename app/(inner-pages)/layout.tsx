import React from 'react';
import style from "./InnerPages.module.css"
import {mockCardArray} from "@/data/productCardData";
import CatalogHeaderCol from "@/components/moleculas/catalog-header-col/CatalogHeaderCol";
import {TextLink} from "@/types/links";

const InnerPagesLayout = ({children}: {
    children: React.ReactNode
}) => {

    const breadcrumbs : TextLink[] = [
        {text : "Главная", path : "/"},
        {text : "Каталог", path : "/catalog"},
        {text : "Кулеры", path : "/catalog/category?=water-coolers"},
    ]

    return (
        <div className={style.wrapper}>
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />
            {children}
        </div>
    )
}

export default InnerPagesLayout
