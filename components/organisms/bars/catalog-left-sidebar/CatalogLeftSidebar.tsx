"use client"

import Text from "@/components/atoms/text/text-base/Text";
import {useEffect, useState} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import Button from "@/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {HeaderDescription} from "@/types/dto/text";
import {useUnit} from "effector-react";
import {$filters, getCategoryFiltersFx, sendFiltersEvent} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import {FilterItem} from "@/types/dto/user/catalog/FilterItem";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {CatalogueFilter, FilterGroup, RangeInputFilter, SelectFilter} from "@/types/dto/user/catalog/Filters";

const headerCV: ClassValue[] = [
    "w-full flex flex-row justify-between items-baseline",
    "pb-[30px] border-b-2 border-light-gray"
]

const HeaderRow = ({header, description}: HeaderDescription) => {
    return (
        <div className={"w-full flex flex-row justify-between items-baseline"}>
            <Text text={header} className={"text-[20px]"}/>
            <Text text={description}/>
        </div>
    )
}

const CatalogLeftSidebar = ({categoryId}: { categoryId: number }) => {

    const [filters, getFilters, sendFilters]
        = useUnit([$filters, getCategoryFiltersFx, sendFiltersEvent])

    const [
        categoryFilters,
        changeCategoryFilters
    ] = useState<CatalogueFilter[]>([])

    const initFilters = (filters: FilterItem[]): CatalogueFilter[] => filters.map(filter => {
        if (filter.variants) {
            const selectItems: CheckboxListItem[] = filter.variants.map(variant => ({name: variant, isSelected: false}))
            return {
                id : filter.id,
                header: filter.name,
                isDirty: false,
                filter: {selectableItems: selectItems}
            } as FilterGroup<SelectFilter>
        } else {
            const maxValue = Object.values(filter.range)[0]
            const minValue = Object.keys(filter.range)[0]
            return {
                id : filter.id,
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

    const onSubmit = () => sendFilters({filters : categoryFilters, categoryId : categoryId})
    const handleClearFilters = () => changeCategoryFilters(initFilters(filters))

    useEffect(() => {
        const sortFn = (first : FilterItem, second : FilterItem) => !first.id ? 1 : first.id - second.id
        getFilters(categoryId)
            .then((filters : FilterItem[]) => filters.toSorted(sortFn))
            .then((filters: FilterItem[]) => changeCategoryFilters(initFilters(filters)))
    }, [])

    if (categoryFilters) return (
        <div className={"hidden col-span-3 sm:flex flex-col gap-[30px]"}>
            <div className={`flex flex-col gap-7 sticky top-[0px]`}>

                <div className={cn(headerCV)}>
                    <Text text={"Фильтры"} className={"text-[20px] font-semibold"}/>
                    <TextButton onClick={handleClearFilters} text={"Очистить все"}/>
                </div>
                {
                    categoryFilters.map((filterGroup, filterKey) => {
                        if ((filterGroup.filter as RangeInputFilter).unit) {
                            return (
                                <LabelInputWrapper
                                    isDirty={filterGroup.isDirty}
                                    header={`${filterGroup.header}, ${(filterGroup.filter as RangeInputFilter).unit}`}
                                    key={filterKey}
                                >
                                    <RangeInput
                                        onChangeFromValue={(value) => handleChangeRangeInput(value, filterKey, "from")}
                                        onChangeToValue={(value) => handleChangeRangeInput(value, filterKey, "to")}
                                        {...(filterGroup.filter as RangeInputFilter)}
                                    />
                                </LabelInputWrapper>
                            )
                        } else return (
                            <LabelInputWrapper
                                isDirty={filterGroup.isDirty}
                                header={filterGroup.header}
                                key={filterKey}
                            >
                                <CheckboxList
                                    items={(filterGroup.filter as SelectFilter).selectableItems}
                                    onSelect={(isSelected, index) =>
                                        handleSelectItem(isSelected, index, filterKey)}
                                />
                            </LabelInputWrapper>
                        )
                    })
                }

                <Button
                    text={"Применить фильтры"}
                    onClick={onSubmit}
                />

            </div>

        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
