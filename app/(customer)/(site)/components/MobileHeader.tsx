
"use client"

import SearchInput from "@/components/atoms/inputs/search-input/SearchInput"
import { QuickAccess } from "@/components/moleculas/quick-access/QuickAccess"
import { $searchValue, searchCatalogByNameEvent } from "@/components/organisms/bars/searchbar/model"
import { useUnit } from "effector-react"

export const MobileHeader = () => {
    const [searchValue, getCategoryByName] = useUnit([$searchValue, searchCatalogByNameEvent])

    return (
        <div className="w-full -mt-5 px-5 pb-5 md:hidden flex flex-col gap-3">
            <SearchInput
                placeholder={"Найти товар, категорию.."}
                onChange={getCategoryByName}
                value={searchValue}
                hasPopover
            />
            <QuickAccess />
        </div>
    )
}