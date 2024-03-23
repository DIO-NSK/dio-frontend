import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {$products} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";

type CategoryFiltersParams = {
    pageable: {
        page: number,
        size: number,
        sort: string[]
    },
    sort: {
        sort: string[]
    },
    categoryFilterDto: {
        filterMap: Record<string, string>,
        categoryId: number,
        priceRange: string
    }
}

const getCategoryFilters = async (categoryId : number) => {
    return getRequest("/catalogue/category/filter", {params : {categoryId}})
}

const getCategoryFiltersFx = createEffect(getCategoryFilters)
export const getCategoryFiltersEvent = createEvent<number>()

const sendFilters = async (params : CategoryFiltersParams) => {
    return api.put("/catalogue/category/filter")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const sendFiltersFx = createEffect(sendFilters)
export const sendFiltersEvent = createEvent<CategoryFiltersParams>()

export const $filters = createStore<FilterItem[]>([])

$products.on(sendFiltersFx.doneData, (_, filteredProducts) => filteredProducts)
$filters.on(getCategoryFiltersFx.doneData, (_, filters) => filters)

sample({
    clock : getCategoryFiltersEvent,
    target : getCategoryFiltersFx
})

sample({
    clock : sendFiltersEvent,
    target : sendFiltersFx
})