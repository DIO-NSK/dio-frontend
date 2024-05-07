"use client"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import {useUnit} from "effector-react";
import {
    $catalogCategoryName,
    $categoryBreadcrumbs,
    $products, $productsAmount,
    getCategoryBreadcrumbsEvent,
} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";
import React, {useEffect} from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useToggle} from "@/utlis/hooks/useToggle";
import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import Loading from "@/components/mobile/loading/Loading";
import dynamic from "next/dynamic";
import CatalogPagination from "@/components/moleculas/pagination/CatalogPagination";

const PageContentWrapper = dynamic(
    () => import("@/components/wrappers/page-content-wrapper/PageContentWrapper"),
    {loading: () => <Loading/>}
)

const DesktopCatalogScreen = ({categoryId, onOpenPopup}: { categoryId: number, onOpenPopup: () => void }) => {

    const [breadcrumbs, categoryName, getBreadcrumbs]
        = useUnit([$categoryBreadcrumbs, $catalogCategoryName, getCategoryBreadcrumbsEvent])

    const [amount, products] = useUnit([$productsAmount, $products])

    useEffect(() => {
        getBreadcrumbs(categoryId)
    }, [])

    if (breadcrumbs.length) return (
        <React.Fragment>
            <section className={"w-full gap-3 sm:gap-0 px-5 sm:px-[100px] sm:col-span-full flex flex-col"}>
                <div className={"w-full sm:hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={"w-full flex flex-col sm:flex-row items-baseline sm:gap-3"}>
                    <Text text={categoryName} className={"text-lg sm:text-2xl font-medium"}/>
                    <Text text={`Всего ${amount} шт.`} className={"text-base text-text-gray"}/>
                </div>
                <div className={"w-full sm:flex hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
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
                        {products.map((card) => {
                            return <ProductCard
                                classNames={{mainWrapper: "w-full", textWrapper: "min-h-0"}}
                                productCard={card}
                            />
                        })}
                        <CatalogPagination categoryId={categoryId}/>
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
