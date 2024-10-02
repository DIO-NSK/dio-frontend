import ClientCatalogScreen from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/ui/ClientCatalogScreen";
import { getCatalog } from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionUrlMask]/page.hooks";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    const catalog = await getCatalog();

    return catalog.map(section => section.categories
        .map(category => ({ categoryUrlMask: category.urlMask }))).flat();
}

export const generateMetadata = async ({ params: { categoryUrlMask } }: { params: { categoryUrlMask: string } }): Promise<Metadata> => {
    const { title, description, keywords } = await getSeoByUrlMask(categoryUrlMask).catch(notFound);

    return {
        title: title,
        description: description,
        keywords: keywords
    }
}

const CatalogScreen = async ({ params: { categoryUrlMask } }: { params: { categoryUrlMask: string } }) => {
    const { entityId: categoryId } = await getSeoByUrlMask(categoryUrlMask);

    return (
        <ClientCatalogScreen categoryId={categoryId as number} />
    )
}

export default CatalogScreen
