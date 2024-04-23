import {useUnit} from "effector-react";
import {$filters, getCategoryFiltersFx, sendFiltersEvent} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {useEffect, useState} from "react";
import {CatalogueFilter, FilterGroup, RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {convertCatalogueFiltersToParams} from "@/utlis/convertCatalogueFilterToParams";
import {createURLFilters} from "@/utlis/createURLFilters";

export const useFilters = (categoryId: number) => {

    const [filters, getFilters, sendFilters]
        = useUnit([$filters, getCategoryFiltersFx, sendFiltersEvent])

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [
        categoryFilters,
        changeCategoryFilters
    ] = useState<CatalogueFilter[]>([])

    const initFilters = (filters: FilterItem[]): CatalogueFilter[] => filters.map(filter => {
        if (filter.variants) {
            const selectItems: CheckboxListItem[] = filter.variants.map(variant => ({name: variant, isSelected: false}))
            return {
                id: filter.id,
                header: filter.name,
                isDirty: false,
                filter: {selectableItems: selectItems}
            } as FilterGroup<SelectFilter>
        } else {
            const maxValue = Object.values(filter.range)[0]
            const minValue = Object.keys(filter.range)[0]
            return {
                id: filter.id,
                header: filter.name,
                isDirty: false,
                filter: {
                    maxValue: maxValue, minValue: minValue,
                    toValue: maxValue, fromValue: minValue,
                    unit: filter.valueName
                },
            } as FilterGroup<RangeInputFilter>
        }
    })

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

    const onSubmit = () => {

        const request = {filters: categoryFilters, categoryId: categoryId}
        sendFilters(request)
        const convertedRequest = convertCatalogueFiltersToParams(request)
        const urlFilters = createURLFilters(convertedRequest)

        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("filterMap", urlFilters)
        const search = current.toString()
        const query = search ? `?${search}` : ""
        router.push(`${pathname}${query}`)

    }
    const handleClearFilters = () => changeCategoryFilters(initFilters(filters))

    useEffect(() => {
        const sortFn = (first: FilterItem, second: FilterItem) => !first.id ? 1 : first.id - second.id
        getFilters(categoryId)
            .then((filters: FilterItem[]) => filters.toSorted(sortFn))
            .then((filters: FilterItem[]) => changeCategoryFilters(initFilters(filters)))
    }, [])

    return {
        categoryFilters, handleSelectItem, handleChangeRangeInput,
        onSubmit, handleClearFilters
    }

}