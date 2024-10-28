import { BASE_URL } from "@/api";
import { Seo } from "@/types/dto/Seo";
import { staticPages } from "./page.data";

const getSeoByUrlMask = async (urlMask: string): Promise<Seo> => {
    return fetch(`${BASE_URL}/seo?urlMask=${urlMask}`, { cache: "no-store" }).then(response => response.json())
}

const getSeoById = async (id: number): Promise<Seo> => {
    return fetch(`${BASE_URL}/seo?id=${id}`, { cache: "no-store" }).then(response => response.json())
}

const getStaticPagesSeo = async (): Promise<Seo[]> => {
    return await Promise.all(Object.keys(staticPages).map(async (id) => {
        return await getSeoById(Number(id))
    }));
}

export { getSeoById, getSeoByUrlMask, getStaticPagesSeo };
