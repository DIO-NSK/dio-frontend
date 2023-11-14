import React from 'react';
import style from "./CatalogLayout.module.css"
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import {TextLink} from "@/types/links";
import CatalogHeaderCol from "@/components/moleculas/catalog-header-col/CatalogHeaderCol";
import {mockCardArray} from "@/data/productCardData";

const CatalogLayout = ({children} : {children : React.ReactNode}) => {

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
            <CatalogLeftSidebar />
            {children}
        </div>
    )

}

export default CatalogLayout
