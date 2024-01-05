import React from 'react';
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {mockCardArray} from "@/data/productCardData";
import CatalogHeaderCol from "@/components/moleculas/cols/catalog-header-col/CatalogHeaderCol";
import {TextLink} from "@/types/dto/text";

const CatalogLayout = ({children} : {children : React.ReactNode}) => {

    const breadcrumbs : TextLink[] = [
        {text : "Главная", link : "/"},
        {text : "Каталог", link : "/catalog"},
        {text : "Кулеры", link : "/catalog/coolers"},
    ]

    return (
        <>
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />
            <InnerPageWrapper>
                <CatalogLeftSidebar />
                {children}
            </InnerPageWrapper>
        </>
    )
}

export default CatalogLayout
