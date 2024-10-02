import {getCatalog} from "./[sectionUrlMask]/page.hooks";
import {MetadataRoute} from "next";

const getAllCategories = async () => {
    const sections = await getCatalog();
    const categories = sections.map((section) => ({urlMask : section.urlMask}));

    return categories.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const flatCategories = await getAllCategories();

    return flatCategories.map((category) => ({
        url: `https://diowater.ru/catalog/categories/${category.urlMask}`,
        lastModified: Date.now().toString(),
    }))
}