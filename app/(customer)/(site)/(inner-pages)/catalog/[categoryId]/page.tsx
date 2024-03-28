"use client"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import {useUnit} from "effector-react";
import {$products, getCategoryByNameEvent} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";
import React, {useEffect} from "react";
import CatalogHeaderCol from "@/components/moleculas/cols/catalog-header-col/CatalogHeaderCol";
import {mockCardArray} from "@/data/productCardData";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import {TextLink} from "@/types/dto/text";
import PageContentWrapper from "@/components/wrappers/page-content-wrapper/PageContentWrapper";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useToggle} from "@/utlis/hooks/useToggle";
import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";

const DesktopCatalogScreen = ({categoryId, onOpenPopup}: { categoryId: number, onOpenPopup: () => void }) => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Каталог", link: "/catalog"},
        {text: "Кулеры", link: "/catalog/coolers"},
    ]

    const [cart, products] = useUnit([$cart, $products])

    return (
        <React.Fragment>
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />
            <InnerPageWrapper>
                <CatalogLeftSidebar categoryId={categoryId}/>
                <section className={"col-span-9 flex flex-col gap-7"}>
                    <Button
                        classNames={{button: "sm:hidden bg-bg-light-blue border-2 border-light-gray"}}
                        text={"Фильтры"}
                        onClick={onOpenPopup}
                        icon={<FiSliders size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                    <PageContentWrapper>
                        {cart && products.map((card) => {
                            return <ProductCard
                                classNames={{mainWrapper: "w-full", textWrapper: "min-h-0"}}
                                productCard={card}
                            />
                        })}
                    </PageContentWrapper>
                </section>
            </InnerPageWrapper>
        </React.Fragment>
    )
}

const CatalogScreen = ({params}: {
    params: {
        categoryId: number
    }
}) => {

    const filtersPopup = useToggle()
    const getCategories = useUnit(getCategoryByNameEvent)

    useEffect(() => {
        getCategories(params.categoryId)
    }, [])

    return (
        <React.Fragment>
            {
                filtersPopup.state
                    ? <CatalogFilters
                        onClose={filtersPopup.toggleState}
                        categoryId={params.categoryId}
                    />
                    : <DesktopCatalogScreen
                        categoryId={params.categoryId}
                        onOpenPopup={filtersPopup.toggleState}
                    />
            }
        </React.Fragment>
    )

}

export default CatalogScreen
