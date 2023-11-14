import React from 'react';
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";

const CatalogLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className={"w-full px-[100px] mt-[30px] grid grid-cols-12 gap-[20px]"}>
            <CatalogLeftSidebar />
            {children}
        </div>
    )
}

export default CatalogLayout
