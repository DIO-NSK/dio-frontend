import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import CatalogCategoryCard from "@/components/organisms/catalog-category-card/CatalogCategoryCard";

import {getCatalog, getCatalogSections, getSectionBreadcrumbs} from "./page.hooks"
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {ResponsivePageWrapper} from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";

export const generateStaticParams = async () => {
    const sections = await getCatalog()
    return sections.map(section => ({sectionId: section.id.toString()}))
}

export const generateMetadata = async ({params: {sectionId}}: { params: { sectionId: number } }): Promise<Metadata> => {
    const categories = await getCatalogSections(sectionId).catch(notFound);
    const section = await getSectionBreadcrumbs(sectionId).catch(notFound);

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
            <section className={"w-full gap-3 sm:gap-0 px-5 md:px-[24px] lg:px-[90px] xl:px-[100px] sm:col-span-full flex flex-col"}>
                <div className={"w-full sm:hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={"w-full flex flex-col sm:flex-row items-baseline sm:gap-3"}>
                    <Text text={section.name} className={"text-lg md:text-2xl font-medium"}/>
                    <Text text={`Всего ${categories.length} шт.`} className={"hidden md:flex text-base text-text-gray"}/>
                </div>
                <div className={"w-full sm:flex hidden"}>
                    <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
            </section>
            <ResponsivePageWrapper className={'gap-3 py-5 md:py-0'}>
                {categories.map((category, key) => (
                    <CatalogCategoryCard card={category} key={key}/>
                ))}
            </ResponsivePageWrapper>
        </>
    );

};

export default CategoriesPage;