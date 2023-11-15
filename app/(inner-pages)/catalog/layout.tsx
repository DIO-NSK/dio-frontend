import React from 'react';
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import style from "../InnerPages.module.css"

const CatalogLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div style={{padding: "0 100px 0 100px"}} className={style.innerLayout}>
            <CatalogLeftSidebar />
            {children}
        </div>
    )
}

export default CatalogLayout
