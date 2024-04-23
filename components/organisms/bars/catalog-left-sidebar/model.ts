import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {$products} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import {CatalogueFilter, FilterGroup, RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import {createURLFilters} from "@/utlis/createURLFilters";
import {convertCatalogueFiltersToParams} from "@/utlis/convertCatalogueFilterToParams";

export type RequestFilterParams = {
    page: number,
    size: number,
    filterMap: Record<string, string>,
    categoryId: number,
    priceRange: string
}

export type FilterMapItem = {
    id: number,
    variants: string
}

export type CatalogueFilterParams = {
    filters: CatalogueFilter[],
    categoryId: number
}

const getCategoryFilters = async (categoryId: number) => {
    return unauthorizedApi.get("/catalogue/category/filter", {params: {categoryId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const getCategoryFiltersFx = createEffect(getCategoryFilters)

const sendFilters = async (params: RequestFilterParams) => {
    const filterMap = createURLFilters(params)
    return unauthorizedApi.get("/catalogue/product/filter", {
        params: {...params, filterMap: filterMap}
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const sendFiltersFx = createEffect(sendFilters)
export const sendFiltersEvent = createEvent<CatalogueFilterParams>()
export const $filters = createStore<FilterItem[]>([])

$products.on(sendFiltersFx.doneData, (_, filteredProducts) => filteredProducts)
$filters.on(getCategoryFiltersFx.doneData, (_, filters) => filters)

sample({
    clock: sendFiltersEvent,
    fn: (params: CatalogueFilterParams) => convertCatalogueFiltersToParams(params),
    target: sendFiltersFx
})