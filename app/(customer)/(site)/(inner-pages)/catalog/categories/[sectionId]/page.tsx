'use client'

import React, {useEffect} from 'react';
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {useUnit} from 'effector-react';
import {
    $catalogCategories,
    $customerSectionBreadcrumbs,
    getCatalogCategoriesEvent
} from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionId]/model";
import {getSectionBreadcrumbsEvent} from "@/app/admin/catalog/model";
import {TextLink} from "@/types/dto/text";
import CatalogCategoryCard from "@/components/organisms/catalog-category-card/page";

const CategoriesPage = ({params}: {
    params: {
        sectionId: number
    }
}) => {

    const [categories, getCategories] = useUnit([$catalogCategories, getCatalogCategoriesEvent])
    const [sectionName, getBreadcrumbs] = useUnit([$customerSectionBreadcrumbs, getSectionBreadcrumbsEvent])

    const breadcrumbs: TextLink[] = [
        {text: 'Главная', link: '/'},
        {text: sectionName, link: `/catalog/categories/${params.sectionId}`}
    ]

    useEffect(() => {
        getCategories(params.sectionId)
        getBreadcrumbs(params.sectionId)
    }, []);

    return (
        <React.Fragment>
            <section className={"w-full gap-3 sm:gap-0 px-5 sm:px-[100px] sm:col-span-full flex flex-col"}>
                <div className={"w-full sm:hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={"w-full flex flex-col sm:flex-row items-baseline sm:gap-3"}>
                    <Text text={sectionName} className={"text-lg sm:text-2xl font-medium"}/>
                    <Text text={`Всего ${categories.length} шт.`} className={"text-base text-text-gray"}/>
                </div>
                <div className={"w-full sm:flex hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <InnerPageWrapper classNames={{mobileWrapper : "gap-4"}}>
                {categories.map((category, key) => (
                    <CatalogCategoryCard card={category} key={key}/>
                ))}
            </InnerPageWrapper>
        </React.Fragment>
    );
};

export default CategoriesPage;