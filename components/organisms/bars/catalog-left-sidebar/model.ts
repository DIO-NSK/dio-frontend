import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {$products} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import {CatalogueFilter, FilterGroup, RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";
import {CheckboxListItem} from "@/types/props/CheckboxItem";

type RequestFilterParams = {
    pageable?: {
        page: number,
        size: number,
        sort: string
    },
    categoryFilterDto: {
        filterMap: Record<string, string>,
        categoryId: number,
        priceRange: string
    }
}

type FilterMapItem = {
    id: number,
    variants: string
}

export type CatalogueFilterParams = {
    filters: CatalogueFilter[],
    categoryId: number
}

const getCategoryFilters = async (categoryId: number) => {
    return getRequest("/catalogue/category/filter", {params: {categoryId}})
}

export const getCategoryFiltersFx = createEffect(getCategoryFilters)

const sendFilters = async (params: RequestFilterParams) => {
    return api.put("/catalogue/product/filter", params)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const sendFiltersFx = createEffect(sendFilters)
export const sendFiltersEvent = createEvent<CatalogueFilterParams>()
export const $filters = createStore<FilterItem[]>([])

$products.on(sendFiltersFx.doneData, (_, filteredProducts) => filteredProducts)
$filters.on(getCategoryFiltersFx.doneData, (_, filters) => filters)

sample({
    clock: sendFiltersEvent,
    fn: (params: CatalogueFilterParams) => convertCatalogueFiltersToParams(params),
    target : sendFiltersFx
})

const convertCatalogueFiltersToParams = (params: CatalogueFilterParams): RequestFilterParams => {

    const {filters, categoryId} = params

    const variantsFilterMapItems: FilterMapItem[] = filters
        .filter(filterGroup => (filterGroup.filter as SelectFilter).selectableItems)
        .map(filterGroup => ({id: filterGroup.id, variants: reduceVariants(filterGroup as FilterGroup<SelectFilter>)}))

    const rangeFilterMapItem: FilterMapItem[] = filters
        .filter(filterGroup => (filterGroup.filter as RangeInputFilter).unit && filterGroup.id)
        .map(filterGroup => ({id: filterGroup.id, variants: reduceRange(filterGroup as FilterGroup<RangeInputFilter>)}))

    const variantsRecord: Record<string, string> = variantsFilterMapItems
        .reduce((acc, variantFilter) =>
            Object.assign(acc, {[variantFilter.id]: variantFilter.variants}), {})

    const rangeRecord: Record<string, string> = rangeFilterMapItem
        .reduce((acc, rangeFilter) =>
            Object.assign(acc, {[rangeFilter.id]: rangeFilter.variants}), {})

    const priceFilterGroup: FilterGroup<RangeInputFilter> = filters.find((filterGroup) =>
        !filterGroup.id) as FilterGroup<RangeInputFilter>

    const priceRange: string = reduceRange(priceFilterGroup)
    const filterMap = Object.assign(variantsRecord, rangeRecord)

    for (const [key, value] of Object.entries(filterMap)) {
        if (!value.length) delete filterMap[key]
    }

    return {
        categoryFilterDto: {
            filterMap: filterMap,
            categoryId: categoryId,
            priceRange: priceRange
        }
    } as RequestFilterParams

}

const reduceRange = (filterGroup: FilterGroup<RangeInputFilter>): string => {
    const {fromValue, toValue, minValue, maxValue} = filterGroup.filter
    const fromRange = (isNaN(+fromValue) || +fromValue < +minValue) ? minValue : +fromValue > +maxValue ? maxValue : fromValue
    const toRange = (isNaN(+toValue) || +toValue > +maxValue) ? maxValue : +toValue < +minValue ? minValue : toValue
    return fromRange + "-" + toRange
}

const reduceVariants = (filterGroup: FilterGroup<SelectFilter>): string => {
    const selectedItems: CheckboxListItem[] = filterGroup.filter.selectableItems.filter(item => item.isSelected)
    return selectedItems.reduce((acc, item, index, array) => {
        return item.isSelected ? (index !== array.length - 1 ? acc + item.name + "-" : acc + item.name) : acc
    }, "")
}