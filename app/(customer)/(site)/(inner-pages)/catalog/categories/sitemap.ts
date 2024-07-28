import {getCatalog, getCatalogSections} from "./[sectionId]/page.hooks";
import {MetadataRoute} from "next";

const getAllCategories = async () => {
    const sections = await getCatalog();
    const categories = await Promise.all(sections.map(async (section) => await getCatalogSections(section.id)));

    return categories.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const flatCategories = await getAllCategories();

    return flatCategories.map((category) => ({
        url: `https://diowater.ru/catalog/categories/${category.id}`,
        lastModified: Date.now().toString(),
    }))
}