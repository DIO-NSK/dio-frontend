import { unauthorizedApi } from "@/api";
import { Seo } from "@/types/dto/Seo";
import { staticPages } from "./page.data";

const getSeoByUrlMask = async (urlMask: string): Promise<Seo> => {
    return unauthorizedApi.get('/seo', { params: { urlMask: urlMask } }).then(response => response.data)
}

const getSeoById = async (id: number): Promise<Seo> => {
    return unauthorizedApi.get('/seo', { params: { id: id } }).then(response => response.data)
}

const getStaticPagesSeo = async (): Promise<Seo[]> => {
    return await Promise.all(Object.keys(staticPages).map(async (id) => {
        return await getSeoById(Number(id))
    }));
}

export { getSeoByUrlMask, getStaticPagesSeo, getSeoById };