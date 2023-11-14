import React from 'react';
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import style from "../InnerPages.module.css"

const CatalogLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className={style.innerLayout}>
            <CatalogLeftSidebar />
            {children}
        </div>
    )
}

export default CatalogLayout
