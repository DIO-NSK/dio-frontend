import Text from "@/components/atoms/text/text-base/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import CatalogCategoryCard from "@/components/organisms/catalog-category-card/CatalogCategoryCard";
import { TextLink } from "@/types/dto/text";

import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import { ResponsivePageWrapper } from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";
import { Metadata } from "next";
import { getCatalog, getCatalogSections, getSectionBreadcrumbs } from "./page.hooks";

export const generateMetadata = async ({ params: { sectionUrlMask } }: { params: { sectionUrlMask: string } }): Promise<Metadata> => {
    const { title, description, keywords } = await getSeoByUrlMask(sectionUrlMask);

    return {
        title: title,
        description: description,
        keywords: keywords
    }
}

export const generateStaticParams = async () => {
    const sections = await getCatalog()

    return sections.map(section => ({ sectionUrlMask: section.urlMask }))
}

const CategoriesPage = async ({ params: { sectionUrlMask } }: { params: { sectionUrlMask: string } }) => {

    const { entityId: sectionId } = await getSeoByUrlMask(sectionUrlMask);
    const categories = await getCatalogSections(sectionId as number)
    const section = await getSectionBreadcrumbs(sectionId as number)

    const breadcrumbs: TextLink[] = [
        { text: 'Главная', link: '/' },
        { text: section.name, link: `/catalog/categories/${sectionUrlMask}` }
    ]

    return (
        <>
            <section className={"w-full gap-3 sm:gap-0 px-5 md:px-[24px] lg:px-[90px] xl:px-[100px] sm:col-span-full flex flex-col"}>
                <div className={"w-full sm:hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className={"w-full flex flex-col sm:flex-row items-baseline sm:gap-3"}>
                    <Text text={section.name} className={"text-lg md:text-2xl font-medium"} />
                    <Text text={`Всего ${categories.length} шт.`} className={"hidden md:flex text-base text-text-gray"} />
                </div>
                <div className={"w-full sm:flex hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </section>
            <ResponsivePageWrapper className={'gap-3 py-5 md:py-0'}>
                {categories.map((category, key) => (
                    <CatalogCategoryCard card={category} key={key} />
                ))}
            </ResponsivePageWrapper>
        </>
    );

};

export default CategoriesPage;