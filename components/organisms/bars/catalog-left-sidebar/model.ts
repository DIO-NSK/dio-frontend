import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import {CatalogueFilter} from "@/types/dto/user/catalog/Filters";
import {createURLFilters} from "@/utlis/createURLFilters";
import {convertCatalogueFiltersToParams} from "@/utlis/convertCatalogueFilterToParams";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

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

export type CatalogProducts = {
    products: ResponseProductSearch[],
    count: number
}

const getCategoryFilters = async (categoryId: number) => {
    return unauthorizedApi.get("/catalogue/category/filter", {params: {categoryId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const getCategoryFiltersFx = createEffect(getCategoryFilters)

const sendFilters = async (params: RequestFilterParams): Promise<CatalogProducts> => {
    const filterMap = params.filterMap ? createURLFilters(params) : undefined
    return unauthorizedApi.get("/catalogue/product/filter", {
        params: {
            categoryId: params.categoryId,
            page: params?.page ?? 0,
            size: params.size ?? 9,
            filterMap: filterMap
        }
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const sendFiltersFx = createEffect(sendFilters)
export const sendFiltersEvent = createEvent<CatalogueFilterParams>()
export const $filters = createStore<FilterItem[]>([])

$filters.on(getCategoryFiltersFx.doneData, (_, filters) => filters)

sample({
    clock: sendFiltersEvent,
    filter: (params: CatalogueFilterParams) => params.filters.length !== 0,
    fn: (params: CatalogueFilterParams) => convertCatalogueFiltersToParams(params),
    target: sendFiltersFx
})