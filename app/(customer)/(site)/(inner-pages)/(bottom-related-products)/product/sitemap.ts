import {MetadataRoute} from "next";
import {getAllProducts} from "./[productUrlMask]/page.hooks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getAllProducts();

    return products.products.map((product) => ({
        url: `https://diowater.ru/product/${(product as any).urlMask}`,
        lastModified: Date.now().toString(),
    }))
}