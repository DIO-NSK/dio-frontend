"use client"

import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiGift, FiX} from "react-icons/fi";
import {useRouter} from "next/navigation";
import MobileCatalogMenu from "@/components/mobile/organisms/mobile-catalog-menu/MobileCatalogMenu";
import Button from "@/components/atoms/buttons/button/Button";
import MobileCatalogSearchingMenu
    from "@/components/mobile/organisms/mobile-catalog-searching-menu/MobileCatalogSearchingMenu";
import {useUnit} from "effector-react";
import {$searchValue, getCatalogEvent, searchCatalogByNameEvent} from "@/components/organisms/bars/searchbar/model";
import {useEffect} from "react";

const MobileMenuCatalogPage = () => {

    const [searchValue, getCategoryByName, getCatalog]
        = useUnit([$searchValue, searchCatalogByNameEvent, getCatalogEvent])

    const router = useRouter()

    const handleSalesClick = () => router.push("/sales")
    const handleCloseClick = () => router.back()

    useEffect(() => {
        getCatalog()
    }, [])

    return (
        <MobilePageWrapper>
            <section className={"w-full flex flex-col gap-4"}>
                <HeaderRow
                    header={"Каталог"}
                    rightContent={
                        <FiX
                            size={"20px"}
                            onClick={handleCloseClick}
                        />
                    }
                />
                <div className={"flex flex-col gap-3"}>
                    <SearchInput
                        placeholder={"Найти товар, категорию.."}
                        onChange={getCategoryByName}
                        value={searchValue}
                    />
                    {searchValue === "" && <Button
                        text={"Акции"}
                        onClick={handleSalesClick}
                        icon={<FiGift size={"18px"}/>}
                        buttonType={"SECONDARY"}
                    />}
                </div>
            </section>
            {searchValue === "" ? <MobileCatalogMenu/>
                : <MobileCatalogSearchingMenu/>}
        </MobilePageWrapper>
    );
};

export default MobileMenuCatalogPage;
