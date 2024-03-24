"use client"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {useCatalogPage} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import {useUnit} from "effector-react";
import {$categories, getCategoryByNameEvent} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";
import React, {useEffect} from "react";
import CatalogHeaderCol from "@/components/moleculas/cols/catalog-header-col/CatalogHeaderCol";
import {mockCardArray} from "@/data/productCardData";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import {TextLink} from "@/types/dto/text";
import PageContentWrapper from "@/components/wrappers/page-content-wrapper/PageContentWrapper";
import {getFavouritesEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import {getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const CatalogScreen = ({params}: {
    params: {
        categoryId: number
    }
}) => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Каталог", link: "/catalog"},
        {text: "Кулеры", link: "/catalog/coolers"},
    ]

    const [categories, getCategories, getFavourites]
        = useUnit([$categories, getCategoryByNameEvent, getCartEvent, getFavouritesEvent])

    const {...context} = useCatalogPage()

    useEffect(() => {
        getFavourites()
        getCategories(params.categoryId)
    }, [])

    return (
        <React.Fragment>
            <CatalogHeaderCol
                text={"Кулеры"}
                amount={mockCardArray.length}
                breadcrumbs={breadcrumbs}
            />
            <InnerPageWrapper>
                <CatalogLeftSidebar categoryId={params.categoryId}/>
                <section className={"col-span-9 flex flex-col gap-7"}>
                    <div className={"w-full flex flex-row gap-3 sm:col-span-full sm:grid sm:grid-cols-9 sm:gap-[20px]"}>
                        <Button
                            classNames={{button: "sm:hidden bg-bg-light-blue border-2 border-light-gray"}}
                            onClick={context.handleFiltersClick}
                            icon={<FiSliders size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            size={"sm"}
                        />
                        <SelectInput
                            width={"sm:col-span-3 w-full"}
                            items={context.selectInput.itemList}
                            onSelect={(item) => context.selectInput.selectItem(item)}
                            selectedItem={context.selectInput.selectedItem}
                        />
                    </div>

                    <PageContentWrapper>
                        {
                            categories.map((card) => {
                                return <ProductCard
                                    classNames={{mainWrapper: "w-full", textWrapper: "min-h-0"}}
                                    productCard={card}
                                />
                            })
                        }
                    </PageContentWrapper>
                </section>
            </InnerPageWrapper>
        </React.Fragment>
    )
}

export default CatalogScreen
