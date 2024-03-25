import {CheckboxListItem} from "@/types/props/CheckboxItem";

export type SelectFilter = {
    selectableItems: CheckboxListItem[]
}

export type RangeInputFilter = {
    unit: string,
    maxValue: string,
    minValue: string,
    fromValue: string,
    toValue: string
}

export type FilterGroup<T> = {
    id : number,
    isDirty: boolean,
    header: string,
    filter: T
}

export type CatalogueFilter = FilterGroup<RangeInputFilter> | FilterGroup<SelectFilter>