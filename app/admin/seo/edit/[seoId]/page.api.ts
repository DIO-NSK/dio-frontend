import { api } from "@/api";
import { SeoData } from "@/schemas/admin/SeoSchema";

export const editSeo = (seo: SeoData) => {
    const keywords = seo.keywords?.split(',');
    return api.put('/seo', { ...seo, keywords: keywords }).then(response => response.data);
}