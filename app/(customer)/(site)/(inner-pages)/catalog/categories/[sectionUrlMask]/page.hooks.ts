import { BASE_URL } from "@/api";
import { CatalogCategory } from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionUrlMask]/model";

export const getCatalogSections = async (sectionId: number): Promise<CatalogCategory[]> => {
    const query = `sectionId=${sectionId}`;
    const response = await fetch(`${BASE_URL}/catalogue/category/with-image?${query}`, { cache: "no-store" });

    if (response.ok) {
        return response.json();
    }

    throw new Error(response.statusText);
}

export const getSectionBreadcrumbs = async (categoryId: number): Promise<{ sectionUrlMask: string, name: string }> => {
    const query = `sectionId=${categoryId}`
    const response = await fetch(`${BASE_URL}/catalogue/breadcrumb/section?${query}`, { cache: "no-store" });

    if (response.ok) {
        return response.json();
    }

    throw new Error(response.statusText);

}

export const getCatalog = async (): Promise<CatalogItem[]> => {
    return fetch(`${BASE_URL}/catalogue`, { cache: "no-store", next : {revalidate : 0} })
        .then(response => response.json())
}