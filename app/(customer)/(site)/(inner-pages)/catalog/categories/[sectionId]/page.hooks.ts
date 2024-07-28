import {BASE_URL} from "@/api";
import {CatalogCategory} from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionId]/model";

export const getCatalogSections = async (sectionId: number): Promise<CatalogCategory[]> => {
    const query = `sectionId=${sectionId}`
    return fetch(`${BASE_URL}/catalogue/category/with-image?${query}`, {cache: "no-store"})
        .then(response => response.json())
}

export const getSectionBreadcrumbs = async (categoryId: number): Promise<{ id: number, name: string }> => {
    const query = `sectionId=${categoryId}`
    return fetch(`${BASE_URL}/catalogue/breadcrumb/section?${query}`, {cache: "no-store"})
        .then(response => response.text())
        .then(name => ({id: categoryId, name: name}))
}

export const getCatalog = async (): Promise<CatalogItem[]> => {
    return fetch(`${BASE_URL}/catalogue`, {cache: "no-store"})
        .then(response => response.json())
}