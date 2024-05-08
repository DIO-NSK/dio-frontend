import {useUnit} from "effector-react";
import {
    $filters,
    CatalogueFilterParams,
    getCategoryFiltersFx,
    sendFiltersEvent
} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {useEffect, useState} from "react";
import {CatalogueFilter, FilterGroup, RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {convertCatalogueFiltersToParams} from "@/utlis/convertCatalogueFilterToParams";
import {createURLFilters} from "@/utlis/createURLFilters";

export const useFilters = (categoryId: number) => {

    const [getFilters, sendFilters] = useUnit([getCategoryFiltersFx, sendFiltersEvent])

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [
        categoryFilters,
        changeCategoryFilters
    ] = useState<CatalogueFilter[]>([])

    const initFilters = (filters: FilterItem[]): CatalogueFilter[] => {
        const urlFilterMap = createURLFilterMap()
        const categoryFilters: CatalogueFilter[] = filters.map((filter, filterIndex) => {
            if (filter.variants) {
                const selectItems: CheckboxListItem[] = filter.variants.map(variant => ({
                    name: variant,
                    isSelected: Boolean(urlFilterMap?.[filter.id]?.includes(variant))
                }))
                return {
                    id: filter.id,
                    header: filter.name,
                    isDirty: false,
                    filter: {selectableItems: selectItems}
                } as FilterGroup<SelectFilter>
            } else {
                const maxValue = Object.values(filter.range)[0]
                const minValue = Object.keys(filter.range)[0]
                const priceFromValue = filterIndex === 0 ? urlFilterMap?.["price"]?.[0] : undefined
                const priceToValue = filterIndex === 0 ? urlFilterMap?.["price"]?.[1] : undefined
                return {
                    id: filter.id,
                    header: filter.name,
                    isDirty: false,
                    filter: {
                        maxValue: maxValue, minValue: minValue,
                        fromValue: priceFromValue ?? urlFilterMap?.[filter.id]?.[0] ?? minValue,
                        toValue: priceToValue ?? urlFilterMap?.[filter.id]?.[1] ?? maxValue,
                        unit: filter.valueName
                    },
                } as FilterGroup<RangeInputFilter>
            }
        })
        const pageQuery = searchParams.has('page') ? +searchParams.get('page')!! : 1
        sendFilters({filters: categoryFilters, categoryId: categoryId, page: pageQuery - 1, size : 9} as CatalogueFilterParams)
        return categoryFilters
    }

    const handleSelectItem = (isSelected: boolean, itemIndex: number, inputIndex: number) => changeCategoryFilters(
        filters => filters.map((filterGroup, curInputIndex) => {
            if (curInputIndex === inputIndex) {
                const updatedSelectItems = (filterGroup as FilterGroup<SelectFilter>).filter.selectableItems
                    .map((selectItem, curItemIndex) => {
                        if (curItemIndex === itemIndex) {
                            return {...selectItem, isSelected: isSelected} as CheckboxListItem
                        } else return selectItem as CheckboxListItem
                    })
                return {
                    ...filterGroup,
                    isDirty: true,
                    filter: {selectableItems: updatedSelectItems}
                } as FilterGroup<SelectFilter>
            } else return filterGroup as CatalogueFilter
        })
    )

    const handleChangeRangeInput = (value: string, inputIndex: number, side: "from" | "to") => changeCategoryFilters(
        filters => filters.map((filterGroup, filterIndex) => {
            if (filterIndex === inputIndex) {
                return {
                    ...filterGroup,
                    isDirty: true,
                    filter: {
                        ...filterGroup.filter,
                        fromValue: side === "from" ? value : (filterGroup.filter as RangeInputFilter).fromValue,
                        toValue: side === "to" ? value : (filterGroup.filter as RangeInputFilter).toValue
                    }
                } as FilterGroup<RangeInputFilter>
            } else return filterGroup
        })
    )

    const createURLFilterMap = () => {

        const urlFilterMap: Record<string, string[]> = {}

        if (!searchParams.has('filterMap')) return

        const urlFilters = searchParams.get('filterMap')!!.split(',')
        urlFilters.forEach(filter => {
            const [key, value] = filter.split(':')
            urlFilterMap[key] = value.split('-')
        })

        return urlFilterMap

    }

    const onSubmit = () => {

        const request = {filters: categoryFilters, categoryId: categoryId}
        const convertedRequest = convertCatalogueFiltersToParams(request)
        let urlFilters = createURLFilters(convertedRequest)

        // отдельный случай для цены
        urlFilters = urlFilters.concat(`${urlFilters.length ? ',' : ''}price:${convertedRequest.priceRange}`)
        router.push(`${pathname}?page=1&filterMap=${urlFilters}`)
        sendFilters({...request, size : 9} as CatalogueFilterParams)

    }

    const handleClearFilters = () => router.push(pathname)

    useEffect(() => {
        const sortFn = (first: FilterItem, second: FilterItem) => !first.id ? 1 : first.id - second.id
        getFilters(categoryId)
            .then((filters: FilterItem[]) => filters.toSorted(sortFn))
            .then((filters: FilterItem[]) => changeCategoryFilters(initFilters(filters)))
    }, [searchParams])

    return {
        categoryFilters, handleSelectItem, handleChangeRangeInput,
        onSubmit, handleClearFilters
    }

}