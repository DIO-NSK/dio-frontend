import {MetadataRoute} from "next";
import {getSales} from "./page.hooks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sales = await getSales();

    return sales.map((sale) => ({
        url: `https://diowater.ru/sales/${(sale as any).urlMask}`,
        lastModified: Date.now().toString(),
    }))
}