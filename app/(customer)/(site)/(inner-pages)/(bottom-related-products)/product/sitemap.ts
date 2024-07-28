import {MetadataRoute} from "next";
import {getAllProducts} from "./[productId]/page.hooks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getAllProducts();

    return products.products.map((product) => ({
        url: `https://diowater.ru/product/${product.id}`,
        lastModified: Date.now().toString(),
    }))
}