import { MetadataRoute } from "next";
import { getCatalog } from "./categories/[sectionUrlMask]/page.hooks";

const getAllCategories = async () => {
    const catalog = await getCatalog();

    return catalog.map(section => section.categories
        .map(category => ({ urlMask: category.urlMask }))).flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categories = await getAllCategories();

    return categories.map((category) => ({
        url: `https://dioshop.ru/catalog/${category.urlMask}`,
        lastModified: Date.now().toString(),
    }))
}