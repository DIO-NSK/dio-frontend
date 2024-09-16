"use client"

import Text from "@/components/atoms/text/text-base/Text";
import {HeaderDescription} from "@/types/dto/text";
import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";

const HeaderRow = ({header, description}: HeaderDescription) => {
    return (
        <div className={"w-full flex flex-row justify-between items-baseline"}>
            <Text text={header} className={"text-[20px]"}/>
            <Text text={description}/>
        </div>
    )
}

const CatalogLeftSidebar = ({categoryId}: { categoryId: number }) => {
    return (
        <div className={"hidden col-span-3 sm:flex flex-col gap-[30px]"}>
            <div className={`flex flex-col gap-7 sticky top-[0px]`}>
                <CatalogFilters categoryId={categoryId}/>
            </div>
        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
