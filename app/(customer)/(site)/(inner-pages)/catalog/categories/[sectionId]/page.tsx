import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import CatalogCategoryCard from "@/components/organisms/catalog-category-card/CatalogCategoryCard";

import {getCatalog, getCatalogSections, getSectionBreadcrumbs} from "./page.hooks"
import {Metadata} from "next";
import {
    getProductById
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/page.hooks";

export const generateStaticParams = async () => {
    const sections = await getCatalog()
    return sections.map(section => ({sectionId: section.id.toString()}))
}

export const generateMetadata = async ({params: {sectionId}}: { params: { sectionId: number } }): Promise<Metadata> => {
    const categories = await getCatalogSections(sectionId);
    const section = await getSectionBreadcrumbs(sectionId);

    return {
        title: `Категории раздела «${section.name}»`,
        description : `Список всех категория раздела «${section.name}»`,
        keywords : categories.map(category => category.name),
        openGraph: {
            title: `Категории раздела «${section.name}»`,
            description : `Список всех категория раздела «${section.name}»`,
            images: categories.map(category => category.image)
        }
    }
}

const CategoriesPage = async ({params: {sectionId}}: { params: { sectionId: number } }) => {

    const categories = await getCatalogSections(sectionId)
    const section = await getSectionBreadcrumbs(sectionId)

    const breadcrumbs: TextLink[] = [
        {text: 'Главная', link: '/'},
        {text: section.name, link: `/catalog/categories/${sectionId}`}
    ]

    return (
        <>
            <section className={"w-full gap-3 sm:gap-0 px-5 sm:px-[100px] sm:col-span-full flex flex-col"}>
                <div className={"w-full sm:hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={"w-full flex flex-col sm:flex-row items-baseline sm:gap-3"}>
                    <Text text={section.name} className={"text-lg sm:text-2xl font-medium"}/>
                    <Text text={`Всего ${categories.length} шт.`} className={"text-base text-text-gray"}/>
                </div>
                <div className={"w-full sm:flex hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <InnerPageWrapper classNames={{mobileWrapper: "gap-4"}}>
                {categories.map((category, key) => (
                    <CatalogCategoryCard card={category} key={key}/>
                ))}
            </InnerPageWrapper>
        </>
    );

};

export default CategoriesPage;