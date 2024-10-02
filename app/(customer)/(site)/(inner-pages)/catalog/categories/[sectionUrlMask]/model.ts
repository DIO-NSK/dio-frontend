import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {getSectionBreadcrumbsFx} from "@/app/admin/catalog/model";

export type CatalogCategory = {
    id: number,
    name: string,
    image: string
}

const getCatalogCategories = async (sectionId: number) : Promise<CatalogCategory[]> => {
    return unauthorizedApi.get('/catalogue/category/with-image', {params : {sectionId : sectionId}})
        .then(response => response.data)
}

export const getCatalogCategoriesFx = createEffect<number, CatalogCategory[], Error>(getCatalogCategories)
export const getCatalogCategoriesEvent = createEvent<number>()

sample({
    clock: getCatalogCategoriesEvent,
    target: getCatalogCategoriesFx
})

export const $catalogCategories = createStore<CatalogCategory[]>([])

$catalogCategories.on(getCatalogCategoriesFx.doneData, (_, categories) => categories)

export const $customerSectionBreadcrumbs = createStore<string>('')

$customerSectionBreadcrumbs.on(getSectionBreadcrumbsFx.doneData, (_, section) => section.name)